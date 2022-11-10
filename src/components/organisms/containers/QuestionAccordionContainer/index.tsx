import { memo, MouseEvent, ReactNode, useCallback, useState } from 'react'

import { QuestionAccordion } from 'components/organisms/presentations/QuestionAccordion'
import { Question } from 'types/question'
import { Overwrite } from 'types/utils'

type Props = {
  answer: number[]
  question: Overwrite<Question, { question: ReactNode; options: ReactNode[] }>
  questionNumber: number
  selectedAnswer: number[]
  timeframe: 'am' | 'pm'
  year: string
  handleDeleteQuestion?: (
    // eslint-disable-next-line no-unused-vars
    event: MouseEvent<HTMLButtonElement>,
    // eslint-disable-next-line no-unused-vars
    year: string,
    // eslint-disable-next-line no-unused-vars
    timeframe: 'am' | 'pm',
    // eslint-disable-next-line no-unused-vars
    questionNumber: number
  ) => void
}

// eslint-disable-next-line react/display-name
export const QuestionAccordionContainer = memo(
  ({ answer, question, questionNumber, timeframe, year, selectedAnswer, handleDeleteQuestion }: Props) => {
    const [openAccordion, setOpenAccordion] = useState<boolean>(false)
    const [openDialog, setOpenDialog] = useState<boolean>(false) // 画像ダイアログフラグ

    const handleOpenAccordion = useCallback(() => setOpenAccordion(true), [])

    const handleCloseAccordion = useCallback(() => setOpenAccordion(false), [])

    const handleOpenDialog = useCallback(() => setOpenDialog(true), [])

    const handleCloseDialog = useCallback(() => setOpenDialog(false), [])

    return (
      <QuestionAccordion
        answer={answer}
        openAccordion={openAccordion}
        openDialog={openDialog}
        question={question}
        questionNumber={questionNumber}
        selectedAnswer={selectedAnswer}
        timeframe={timeframe}
        year={year}
        handleOpenAccordion={handleOpenAccordion}
        handleCloseAccordion={handleCloseAccordion}
        handleOpenDialog={handleOpenDialog}
        handleCloseDialog={handleCloseDialog}
        handleDeleteQuestion={handleDeleteQuestion}
      />
    )
  }
)
