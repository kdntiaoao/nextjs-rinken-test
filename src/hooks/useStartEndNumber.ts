import { useMemo } from 'react'

export const useStartEndNumber = (questionNumber: string) => {
  const start = useMemo(() => Number(questionNumber.split('-')[0]), [questionNumber])
  const end = useMemo(() => Number(questionNumber.split('-')[1]), [questionNumber])

  return { start, end }
}
