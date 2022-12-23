import { memo, useMemo } from 'react'

import { eachDayOfInterval, eachWeekOfInterval, endOfMonth, endOfWeek, format, startOfMonth } from 'date-fns'

import { LearningRecord } from '../../presentations/LearningRecord'

type Props = {
  learningTimestampArray: number[]
}

// eslint-disable-next-line react/display-name
export const LearningRecordContainer = memo(({ learningTimestampArray }: Props) => {
  const today = useMemo(() => new Date(), [])

  const learningDays = useMemo(() => {
    const days = Array(Number(format(endOfMonth(today), 'd'))).fill(0)
    learningTimestampArray
      .filter((timestamp) => format(timestamp, 'M') === format(today, 'M'))
      .forEach((timestamp) => {
        days[Number(format(timestamp, 'd')) - 1]++
      })

    return days
  }, [learningTimestampArray, today])

  const calendarArray = useMemo(() => {
    const sundays = eachWeekOfInterval({ start: startOfMonth(today), end: endOfMonth(today) })
    return sundays.map((sunday) => eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) }))
  }, [today])

  return <LearningRecord calendarArray={calendarArray} learningDays={learningDays} today={today} />
})
