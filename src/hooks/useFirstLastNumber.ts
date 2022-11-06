import { useMemo } from 'react'

export const useFirstLastNumber = (questionNumber: string) => {
  const first = useMemo(() => Number(questionNumber.split('-')[0]), [questionNumber])
  const last = useMemo(() => Number(questionNumber.split('-')[1]), [questionNumber])

  return { first, last }
}
