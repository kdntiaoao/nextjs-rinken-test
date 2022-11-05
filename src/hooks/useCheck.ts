import { useCallback, useEffect, useState } from 'react'

export const useCheck = () => {
  const [questionsToCheck, setQuestionsToCheck] =
    useState<
      {
        year: string
        timeframe: 'am' | 'pm'
        questionNumber: number
        selectedAnswer: string
      }[]
    >()

  const removeQuestion = useCallback(
    (year: string, timeframe: 'am' | 'pm', questionNumber: number) => {
      const excludedQuestions = questionsToCheck?.filter(
        (question) =>
          !(question.year === year && question.timeframe === timeframe && question.questionNumber === questionNumber)
      )
      localStorage.setItem('questions-to-check', JSON.stringify(excludedQuestions))
      setQuestionsToCheck(excludedQuestions)
    },
    [questionsToCheck]
  )

  useEffect(() => {
    setQuestionsToCheck(
      JSON.parse(localStorage.getItem('questions-to-check') || '[]') as {
        year: string
        timeframe: 'am' | 'pm'
        questionNumber: number
        selectedAnswer: string
      }[]
    )
  }, [])

  return { questionsToCheck, removeQuestion }
}
