import { useCallback, useState } from 'react'

export const useAnswer = (answerIndex: number[]) => {
  const [correct, setCorrect] = useState<boolean>(true) // 正誤フラグ
  const [history, setHistory] = useState<{ selectedAnswers: string[]; correctCount: number }>({
    selectedAnswers: [],
    correctCount: 0,
  })
  const [thinking, setThinking] = useState<boolean>(true) // 解答中はtrue, 答え合わせ中はfalse

  const checkAnswer = useCallback(
    (selectedAnswer: number[]) => {
      const sortedAnswer = selectedAnswer.sort()
      const result = sortedAnswer.toString() === answerIndex.toString()
      setCorrect(result)
      setHistory(({ selectedAnswers, correctCount }) => ({
        selectedAnswers: [...selectedAnswers, sortedAnswer.join(',')],
        correctCount: result ? correctCount + 1 : correctCount,
      }))

      setThinking(false)
    },
    [answerIndex]
  )

  const resetThinking = useCallback(() => setThinking(true), [])

  return { correct, history, thinking, checkAnswer, resetThinking }
}
