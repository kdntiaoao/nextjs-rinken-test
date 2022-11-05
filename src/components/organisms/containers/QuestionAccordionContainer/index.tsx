import { memo, ReactNode, useCallback, useMemo, useState } from 'react'

import { QuestionAccordion } from 'components/organisms/presentations/QuestionAccordion'
import { Question } from 'types/question'
import { Overwrite } from 'types/utils'

type Props = {
  answer: number[]
  question: Overwrite<Question, { question: ReactNode; options: ReactNode[] }>
  questionNumber: number
  selectedAnswer: string
  timeframe: 'am' | 'pm'
  year: string
}

// eslint-disable-next-line react/display-name
export const QuestionAccordionContainer = memo(
  ({ answer, question, questionNumber, timeframe, year, selectedAnswer }: Props) => {
    const [openAccordion, setOpenAccordion] = useState<boolean>(false)
    const [openDialog, setOpenDialog] = useState<boolean>(false) // 画像ダイアログフラグ

    const formattedSelectedAnswer = useMemo(
      () => (selectedAnswer ? selectedAnswer.split(',').map((str) => Number(str)) : []),
      [selectedAnswer]
    )

    const handleToggle = useCallback(() => setOpenAccordion((prev) => !prev), [])

    const handleOpenDialog = useCallback(() => setOpenDialog(true), [])

    const handleCloseDialog = useCallback(() => setOpenDialog(false), [])

    return (
      <QuestionAccordion
        answer={answer}
        openAccordion={openAccordion}
        openDialog={openDialog}
        question={question}
        questionNumber={questionNumber}
        selectedAnswer={formattedSelectedAnswer}
        timeframe={timeframe}
        year={year}
        onToggle={handleToggle}
        handleOpenDialog={handleOpenDialog}
        handleCloseDialog={handleCloseDialog}
      />
    )
  }
)
