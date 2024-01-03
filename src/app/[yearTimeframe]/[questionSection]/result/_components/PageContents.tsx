'use client'

import { useMemo } from 'react'
import { useAtom } from 'jotai'
import { Heading } from '@/components'
import { answeredQuestionListAtom, selectedOptionListAtom } from '@/states'
import questionData from '@/assets/json/question-data.json'

type Props = {
  yearTimeframe: string
  questionSection: string
  title: string
  currentQuestionList: (typeof questionData)[0]['questionList']
  currentAnswerList: (typeof questionData)[0]['answerList']
}

export const PageContents = ({
  yearTimeframe,
  questionSection,
  title,
  currentQuestionList,
  currentAnswerList,
}: Props) => {
  const [selectedOptionList, setSelectedOptionList] = useAtom(selectedOptionListAtom)
  const [answeredQuestionList, setAnsweredQuestionList] = useAtom(answeredQuestionListAtom)

  const currentAnsweredQuestionList = useMemo(
    () => answeredQuestionList.filter((item) => item.questionID.startsWith(`${yearTimeframe}_${questionSection}`)),
    [answeredQuestionList, yearTimeframe, questionSection],
  )

  const correctCount = currentAnsweredQuestionList.filter((item) => item.isCorrect).length

  return (
    <>
      <Heading>{title}</Heading>

      <p>
        {correctCount} / {currentAnswerList.length}
      </p>
    </>
  )
}
