'use client'

import Link from 'next/link'
import questionData from '@/assets/json/question-data.json'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { PrimaryButton } from '@/components'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid'
// import { useAtom } from 'jotai'
// import { answeredQuestionListAtom, selectedOptionListAtom } from '@/states'

type Props = {
  yearTimeframe: string
  questionSection: string
  title: string
  currentQuestionList: (typeof questionData)[0]['questionList']
  currentAnswerList: (typeof questionData)[0]['answerList']
}

type AnsweredQuestion = {
  num: number
  isCorrect: boolean
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

  // const [selectedOptionList, setSelectedOptionList] = useAtom(selectedOptionListAtom)
  // const [answeredQuestionList, setAnsweredQuestionList] = useAtom(answeredQuestionListAtom)
  const [selectedOptionList, setSelectedOptionList] = useState<string[]>([])
  const [answeredQuestionList, setAnsweredQuestionList] = useState<AnsweredQuestion[]>([])

  const currentNum = Number(searchParams.get('num'))
  const currentQuestion = currentQuestionList.find((item) => item.num === currentNum)
  const firstNum = Number(questionSection.split('-')[0])
  const currentAnswer = currentAnswerList[currentNum - firstNum]

  const handleChangeOption = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target
    if (target.checked) {
      setSelectedOptionList((optionList) => Array.from(new Set([...optionList, target.value])))
    } else {
      setSelectedOptionList((optionList) => optionList.filter((item) => item !== target.value))
    }
  }

  const changeQuestion = (step: number) => {
    const nextNum = currentNum + step
    const min = currentQuestionList[0].num
    const max = currentQuestionList[currentQuestionList.length - 1].num
    if (nextNum < min || nextNum > max) {
      return
    }
    router.push(`${pathname}?num=${currentNum + step}`)
  }

  const answerQuestion = () => {
    const currentSelectedOptionList = selectedOptionList
      .filter((item) => item.startsWith(`${currentNum}`))
      .map((item) => Number(item.split('_')[1]))
      .sort((a, b) => a - b)
    const isCorrect = JSON.stringify(currentSelectedOptionList) === JSON.stringify(currentAnswer)
    setAnsweredQuestionList((list) => [
      ...list.filter((item) => item.num !== currentNum),
      { num: currentNum, isCorrect },
    ])
    console.log(isCorrect, currentSelectedOptionList, currentAnswer)

    setTimeout(() => {
      changeQuestion(1)
    }, 1000)
  }

  useEffect(() => {
    if (currentNum) {
      return
    }
    const params = new URLSearchParams(searchParams)
    params.set('num', currentQuestionList[0].num.toString())
    router.replace(`${pathname}?${params}`)
  }, [currentNum, currentQuestionList, pathname, router, searchParams])

  if (!currentQuestion || !currentAnswer) {
    return null
  }

  return (
    <>
      <h1>{title}</h1>

      <ul className="flex gap-2">
        {currentQuestionList.map((question, index) => (
          <li key={index.toString()} className={question.num === currentNum ? 'bg-primary-600' : ''}>
            <Link href={{ pathname: `/${yearTimeframe}/${questionSection}`, query: { num: question.num } }}>
              {question.num}
            </Link>
          </li>
        ))}
      </ul>

      <div>
        <p>{currentQuestion.statement}</p>
        <div className="grid gap-2">
          {currentQuestion.optionList.map((option, optionIndex) => (
            <label key={optionIndex.toString()} className="flex gap-2 bg-primary-600">
              <input
                type="checkbox"
                value={`${currentQuestion.num}_${optionIndex + 1}`}
                checked={selectedOptionList.includes(`${currentQuestion.num}_${optionIndex + 1}`)}
                onChange={handleChangeOption}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

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
        <PrimaryButton
          disabled={answeredQuestionList.map((item) => item.num).includes(currentNum)}
          onClick={answerQuestion}
        >
          解答
        </PrimaryButton>
        <PrimaryButton onClick={() => changeQuestion(1)}>
          <ArrowRightIcon aria-hidden="false" title="次の問題に進む" className="h-6 w-6" />
        </PrimaryButton>
      </div>
    </>
  )
}
