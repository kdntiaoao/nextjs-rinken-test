import { useCallback, useState } from 'react'

const saveIncorrectQuestion = (
  year: string,
  timeframe: 'am' | 'pm',
  questionNumber: number,
  selectedAnswer: string
) => {
  const questionsToCheck = JSON.parse(localStorage.getItem('questions-to-check') || '[]')
  const excludedTargetQuestion = questionsToCheck.filter(
    (question: { year: string; timeframe: 'am' | 'pm'; questionNumber: number }) =>
      !(question.year === year && question.timeframe === timeframe && question.questionNumber === questionNumber)
  )
  excludedTargetQuestion.push({ year, timeframe, questionNumber, selectedAnswer })
  localStorage.setItem('questions-to-check', JSON.stringify(excludedTargetQuestion))
}

export const useAnswer = (answerIndex: number[]) => {
  const [correct, setCorrect] = useState<boolean>(true) // 正誤フラグ
  const [history, setHistory] = useState<{ selectedAnswers: string[]; correctCount: number }>({
    selectedAnswers: [],
    correctCount: 0,
  })
  const [thinking, setThinking] = useState<boolean>(true) // 解答中はtrue, 答え合わせ中はfalse

  const checkAnswer = useCallback(
    (year: string, timeframe: 'am' | 'pm', questionNumber: number, selectedAnswer: number[]) => {
      const sortedAnswer = selectedAnswer.sort()
      const result = sortedAnswer.toString() === answerIndex.toString()
      setCorrect(result)
      if (!result) {
        saveIncorrectQuestion(year, timeframe, questionNumber, sortedAnswer.join(','))
      }
      setHistory(({ selectedAnswers, correctCount }) => ({
        selectedAnswers: [...selectedAnswers, sortedAnswer.join(',')],
        correctCount: result ? correctCount + 1 : correctCount,
      }))

      setThinking(false)
    },
    [answerIndex]
  )

  const resetHistory = useCallback(
    () =>
      setHistory({
        selectedAnswers: [],
        correctCount: 0,
      }),
    []
  )

  const resetThinking = useCallback(() => setThinking(true), [])

  return { correct, history, thinking, checkAnswer, resetHistory, resetThinking }
}
