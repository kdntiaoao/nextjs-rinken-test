import { useCallback, useState } from 'react'

export const useSelectedAnswer = (answerLength: number, thinking: boolean) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number[]>([]) // 選択されている解答

  const changeSelect = useCallback(
    (selectedIndex: number) => {
      if (!thinking) return

      const index = selectedAnswer.indexOf(selectedIndex)
      if (index < 0) {
        setSelectedAnswer((prev) => [...prev, selectedIndex].slice(-answerLength))
      } else {
        setSelectedAnswer((prev) => prev.filter((answer) => answer !== selectedIndex))
      }
    },
    [answerLength, selectedAnswer, thinking]
  )

  const resetSelect = useCallback(() => setSelectedAnswer([]), [])

  return { selectedAnswer, changeSelect, resetSelect }
}
