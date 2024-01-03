'use client'

import { ChangeEvent, Fragment, useEffect, useMemo, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useAtom } from 'jotai'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid'
import { Heading, PrimaryButton } from '@/components'
import { OptionListItem } from './OptionListItem'
import { OptionList } from './OptionList'
import { QuestionNav } from './QuestionNav'
import { QuestionNavItem } from './QuestionNavItem'
import { answeredQuestionListAtom, selectedOptionListAtom } from '@/states'
import questionData from '@/assets/json/question-data.json'
import { get } from 'http'
import Link from 'next/link'

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
  const lastNum = Number(questionSection.split('-')[1])
  const currentQuestionID = `${yearTimeframe}_${questionSection}_${currentNum}`
  const currentQuestionAnswerList = currentAnswerList[currentNum - firstNum]

  const currentQuestion = useMemo(
    () => currentQuestionList.find((item) => item.num === currentNum),
    [currentQuestionList, currentNum],
  )

  const getQuestionNum = (questionID: string): number => {
    return Number(questionID.split('_')[2])
  }

  const getQuestionOption = (questionID: string): number => {
    return Number(questionID.split('_')[3])
  }

  const getIsAnswered = (num: number): boolean => {
    return answeredQuestionList.map((item) => getQuestionNum(item.questionID)).includes(num)
  }

  const isAnswered = getIsAnswered(currentNum)
  const isCorrect = answeredQuestionList.find((item) => getQuestionNum(item.questionID) === currentNum)?.isCorrect

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
    if (nextNum < firstNum || nextNum > lastNum) {
      return
    }
    router.push(`${pathname}?num=${currentNum + step}`)
  }

  const answerQuestion = () => {
    window.clearTimeout(timerID.current)
    const currentSelectedOptionList = selectedOptionList
      .filter((item) => item.startsWith(currentQuestionID))
      .map((item) => getQuestionOption(item))
      .sort((a, b) => a - b)
    const isCorrect = JSON.stringify(currentSelectedOptionList) === JSON.stringify(currentQuestionAnswerList)
    setAnsweredQuestionList((list) => [
      ...list.filter((item) => item.questionID !== currentQuestionID),
      { questionID: currentQuestionID, isCorrect },
    ])

    // TODO: 一定時間後に次の問題に進む
    // if (isCorrect) {
    //   timerID.current = window.setTimeout(() => {
    //     changeQuestion(1)
    //   }, 800)
    // }
  }

  const resetAnswer = () => {
    setSelectedOptionList((optionList) =>
      optionList.filter((item) => !item.startsWith(`${yearTimeframe}_${questionSection}`)),
    )
    setAnsweredQuestionList((list) =>
      list.filter((item) => !item.questionID.startsWith(`${yearTimeframe}_${questionSection}`)),
    )
    const params = new URLSearchParams(searchParams)
    params.set('num', currentQuestionList[0].num.toString())
    router.replace(`${pathname}?${params}`)
  }

  useEffect(() => {
    if (currentNum >= firstNum && currentNum <= lastNum) {
      return
    }
    resetAnswer()
  }, [currentNum, firstNum, lastNum])

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
            completed={getIsAnswered(question.num)}
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
              isAnswer={currentQuestionAnswerList.includes(index + 1)}
              value={`${yearTimeframe}_${questionSection}_${currentQuestion.num}_${index + 1}`}
              checked={selectedOptionList.includes(
                `${yearTimeframe}_${questionSection}_${currentQuestion.num}_${index + 1}`,
              )}
              onChange={handleChangeOption}
            />
          </Fragment>
        ))}
      </OptionList>

      {isAnswered && (
        <div className="my-8">
          {isCorrect ? <p className="text-green-600">正解</p> : <p className="text-red-600">不正解</p>}
        </div>
      )}

      <div className="my-8 flex gap-4">
        <PrimaryButton disabled={currentNum <= firstNum} onClick={() => changeQuestion(-1)}>
          <ArrowLeftIcon aria-hidden="false" title="前の問題に戻る" className="h-6 w-6" />
        </PrimaryButton>
        <PrimaryButton disabled={isAnswered} onClick={answerQuestion}>
          解答
        </PrimaryButton>
        <PrimaryButton disabled={currentNum >= lastNum} onClick={() => changeQuestion(1)}>
          <ArrowRightIcon aria-hidden="false" title="次の問題に進む" className="h-6 w-6" />
        </PrimaryButton>
      </div>

      <div className="my-8">
        <Link href={`/${yearTimeframe}/${questionSection}/result`}>結果</Link>
      </div>

      <div className="my-8">
        <PrimaryButton onClick={resetAnswer}>解答をリセット</PrimaryButton>
      </div>
    </>
  )
}
