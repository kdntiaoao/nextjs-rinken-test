import { memo } from 'react'

import { format } from 'date-fns'

type Props = {
  calendarArray: Date[][]
  learningDays: number[]
  today: Date
}

const getDayBgcolor = (count: number) => {
  if (count === 0) {
    return 'bg-gray-100 dark:bg-slate-700'
  } else if (count < 5) {
    return 'bg-primary-200 dark:bg-primary-500/40'
  } else if (count < 10) {
    return 'bg-primary-300 dark:bg-primary-500/60'
  } else if (count < 15) {
    return 'bg-primary-400 dark:bg-primary-500/80 dark:text-black'
  } else if (count < 20) {
    return 'bg-primary-500 text-black dark:bg-primary-500 dark:text-black'
  }
}

// eslint-disable-next-line react/display-name
export const LearningRecord = memo(({ calendarArray, learningDays, today }: Props) => {
  return (
    <>
      <h2 className="text-xl">{format(today, 'M')}月の学習記録</h2>
      <div className="mt-8">
        <table className="mx-auto w-full max-w-2xl border-separate border-spacing-2 text-center">
          <thead>
            <tr className="">
              <th>日</th>
              <th>月</th>
              <th>火</th>
              <th>水</th>
              <th>木</th>
              <th>金</th>
              <th>土</th>
            </tr>
          </thead>
          <tbody>
            {calendarArray.map((week, i) => (
              <tr key={i.toString()}>
                {week.map((day, j) =>
                  (i === 0 && Number(format(day, 'd')) > 7) ||
                  (i === calendarArray.length - 1 && Number(format(day, 'd')) < 7) ? (
                    <td key={j.toString()} className="h-10 rounded bg-gray-100/40 dark:bg-slate-700/40"></td>
                  ) : (
                    <td
                      key={j.toString()}
                      className={`h-10 rounded text-sm ${
                        Number(format(day, 'd')) === Number(format(today, 'd')) && 'border-2 border-secondary-500'
                      } ${getDayBgcolor(learningDays[Number(format(day, 'd')) - 1])}`}
                      aria-label={`${format(day, 'M月d日')}は${
                        learningDays[Number(format(day, 'd')) - 1]
                      }回のテストを受けました。`}
                    >
                      {format(day, 'd')}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4" aria-hidden="true">
          <div className="mx-auto flex w-full max-w-2xl items-center justify-end gap-2">
            <p>少ない</p>
            <ul className="flex gap-2">
              <li className="h-5 w-5 rounded bg-gray-100 dark:bg-slate-700"></li>
              <li className="h-5 w-5 rounded bg-primary-200 dark:bg-primary-500/40"></li>
              <li className="h-5 w-5 rounded bg-primary-300 dark:bg-primary-500/60"></li>
              <li className="h-5 w-5 rounded bg-primary-400 dark:bg-primary-500/80"></li>
              <li className="h-5 w-5 rounded bg-primary-500 dark:bg-primary-500"></li>
            </ul>
            <p>多い</p>
          </div>
        </div>
      </div>
    </>
  )
})
