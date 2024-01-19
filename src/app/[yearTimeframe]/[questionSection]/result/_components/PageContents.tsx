'use client'

import { Fragment, useEffect, useMemo } from 'react'
import { useAtom } from 'jotai'
import { Heading } from '@/components'
import { AnsweredQuestion, answeredQuestionListAtom, selectedOptionListAtom } from '@/states'
import questionData from '@/assets/json/question-data.json'
import { OptionList } from '../../_components/OptionList'
import { OptionListItem } from '../../_components/OptionListItem'

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

  console.log(answeredQuestionList)
  
  useEffect(() => {
    setAnsweredQuestionList((answeredList) => {
      const defaultAnsweredQuestionList: AnsweredQuestion[] = []
      for (let i = 0; i < currentQuestionList.length; i++) {
        const questionID = `${yearTimeframe}_${questionSection}_${currentQuestionList[i].num}`
        if (answeredList.map((item) => item.questionID).includes(questionID)) {
          continue
        }
        defaultAnsweredQuestionList.push({
          questionID: `${yearTimeframe}_${questionSection}_${currentQuestionList[i].num}`,
          isCorrect: false,
        })
      }
      return [...defaultAnsweredQuestionList, ...answeredList]
    })
  }, [])

  return (
    <>
      <Heading>{title}</Heading>

      <p>
        {correctCount} / {currentAnswerList.length}
      </p>

      <ol className="grid gap-4">
        {currentQuestionList.map((question, index) => (
          <li key={index.toString()} className="border p-4">
            <p>
              <span>問題 {question.num}</span>
              <br />
              {question.statement}
            </p>
            <OptionList>
              {question.optionList.map((option, optionIndex) => (
                <Fragment key={optionIndex.toString()}>
                  {optionIndex !== 0 && <hr className="border-primary-400" />}
                  <OptionListItem
                    disabled={true}
                    option={option}
                    isAnswer={currentAnswerList[index].includes(optionIndex + 1)}
                    value={`${yearTimeframe}_${questionSection}_${question.num}_${optionIndex + 1}`}
                    checked={selectedOptionList.includes(
                      `${yearTimeframe}_${questionSection}_${question.num}_${optionIndex + 1}`,
                    )}
                  />
                </Fragment>
              ))}
            </OptionList>
          </li>
        ))}
      </ol>
    </>
  )
}
