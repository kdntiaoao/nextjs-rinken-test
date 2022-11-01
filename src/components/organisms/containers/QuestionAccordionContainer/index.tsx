import { memo, useCallback, useMemo, useState } from 'react'

import { QuestionAccordion } from 'components/organisms/presentations/QuestionAccordion'

type Props = {
  answer: number[]
  options: string[]
  question: string
  questionNumber: number
  selectedAnswer: string
}

// eslint-disable-next-line react/display-name
export const QuestionAccordionContainer = memo(
  ({ answer, options, question, questionNumber, selectedAnswer }: Props) => {
    const [open, setOpen] = useState<boolean>(false)

    const formattedSelectedAnswer = useMemo(
      () => selectedAnswer ? selectedAnswer.split(',').map((str) => Number(str)) : [],
      [selectedAnswer]
    )

    const handleToggle = useCallback(() => setOpen((prev) => !prev), [])

    return (
      <QuestionAccordion
        answer={answer}
        open={open}
        options={options}
        question={question}
        questionNumber={questionNumber}
        selectedAnswer={formattedSelectedAnswer}
        onToggle={handleToggle}
      />
    )
  }
)
