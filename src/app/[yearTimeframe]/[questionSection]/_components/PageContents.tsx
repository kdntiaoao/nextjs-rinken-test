'use client'

import { ChangeEvent, Fragment, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useAtom } from 'jotai'
import { PrimaryButton } from '@/components'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid'
import { OptionListItem } from './OptionListItem'
import { OptionList } from './OptionList'
import { answeredQuestionListAtom, selectedOptionListAtom } from '@/states'
import questionData from '@/assets/json/question-data.json'
import { QuestionNav } from './QuestionNav'
import { QuestionNavItem } from './QuestionNavItem'
import { Heading } from '@/components/Heading'

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
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [selectedOptionList, setSelectedOptionList] = useAtom(selectedOptionListAtom)
  const [answeredQuestionList, setAnsweredQuestionList] = useAtom(answeredQuestionListAtom)

  const timerID = useRef<number>(0)

  const currentNum = Number(searchParams.get('num'))
  const firstNum = Number(questionSection.split('-')[0])
  const currentQuestionAnswerList = currentAnswerList[currentNum - firstNum]

  const currentQuestion = useMemo(
    () => currentQuestionList.find((item) => item.num === currentNum),
    [currentQuestionList, currentNum],
  )

  const isAnswered = useMemo(
    () => answeredQuestionList.map((item) => item.num).includes(currentNum),
    [answeredQuestionList, currentNum],
  )

  const changeOption = <T extends string>(optionList: T[], selectedOption: T | null, deselectedOption?: T): T[] => {
    let result = [...optionList]
    if (selectedOption) {
      result = result.concat(selectedOption)
    }
    if (deselectedOption) {
      result = result.filter((item) => item !== deselectedOption)
    }
    const currentSelectedOptionList = result.filter((item) =>
      item.startsWith(`${yearTimeframe}_${questionSection}_${currentNum}`),
    )
    if (currentSelectedOptionList.length > currentQuestionAnswerList.length) {
      result = result.filter((item) => item !== currentSelectedOptionList[0])
    }
    return Array.from(new Set(result))
  }

  const handleChangeOption = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target
    if (target.checked) {
      setSelectedOptionList((optionList) => changeOption(optionList, target.value))
    } else {
      setSelectedOptionList((optionList) => changeOption(optionList, null, target.value))
    }
  }

  const changeQuestion = (step: number) => {
    window.clearTimeout(timerID.current)
    const nextNum = currentNum + step
    const min = currentQuestionList[0].num
    const max = currentQuestionList[currentQuestionList.length - 1].num
    if (nextNum < min || nextNum > max) {
      return
    }
    router.push(`${pathname}?num=${currentNum + step}`)
  }

  const answerQuestion = () => {
    window.clearTimeout(timerID.current)
    const currentSelectedOptionList = selectedOptionList
      .filter((item) => item.startsWith(`${yearTimeframe}_${questionSection}_${currentNum}`))
      .map((item) => Number(item.split('_')[3]))
      .sort((a, b) => a - b)
    const isCorrect = JSON.stringify(currentSelectedOptionList) === JSON.stringify(currentQuestionAnswerList)
    setAnsweredQuestionList((list) => [
      ...list.filter((item) => item.num !== currentNum),
      { num: currentNum, isCorrect },
    ])

    // TODO: 一定時間後に次の問題に進む
    // if (isCorrect) {
    //   timerID.current = window.setTimeout(() => {
    //     changeQuestion(1)
    //   }, 800)
    // }
  }

  useEffect(() => {
    if (currentNum) {
      return
    }
    const params = new URLSearchParams(searchParams)
    params.set('num', currentQuestionList[0].num.toString())
    router.replace(`${pathname}?${params}`)
  }, [currentNum, currentQuestionList, pathname, router, searchParams])

  if (!currentQuestion || !currentQuestionAnswerList) {
    return null
  }

  return (
    <>
      <Heading>{title}</Heading>

      <QuestionNav>
        {currentQuestionList.map((question, index) => (
          <QuestionNavItem
            key={index.toString()}
            selected={question.num === currentNum}
            completed={answeredQuestionList.map((item) => item.num).includes(question.num)}
            href={{ pathname: `/${yearTimeframe}/${questionSection}`, query: { num: question.num } }}
          />
        ))}
      </QuestionNav>

      <p>
        <span>問題 {currentNum}</span>
        <br />
        {currentQuestion.statement}
      </p>
      <OptionList>
        {currentQuestion.optionList.map((option, index) => (
          <Fragment key={index.toString()}>
            {index !== 0 && <hr className="border-primary-400" />}
            <OptionListItem
              disabled={isAnswered}
              option={option}
              value={`${yearTimeframe}_${questionSection}_${currentQuestion.num}_${index + 1}`}
              checked={selectedOptionList.includes(
                `${yearTimeframe}_${questionSection}_${currentQuestion.num}_${index + 1}`,
              )}
              onChange={handleChangeOption}
            />
          </Fragment>
        ))}
      </OptionList>

      {answeredQuestionList.map((item) => item.num).includes(currentNum) && (
        <div className="my-8">
          {answeredQuestionList.find((item) => item.num === currentNum)?.isCorrect ? (
            <p className="text-green-600">正解</p>
          ) : (
            <p className="text-red-600">不正解</p>
          )}
        </div>
      )}

      <div className="my-8 flex gap-4">
        <PrimaryButton onClick={() => changeQuestion(-1)}>
          <ArrowLeftIcon aria-hidden="false" title="前の問題に戻る" className="h-6 w-6" />
        </PrimaryButton>
        <PrimaryButton disabled={isAnswered} onClick={answerQuestion}>
          解答
        </PrimaryButton>
        <PrimaryButton onClick={() => changeQuestion(1)}>
          <ArrowRightIcon aria-hidden="false" title="次の問題に進む" className="h-6 w-6" />
        </PrimaryButton>
      </div>
    </>
  )
}
