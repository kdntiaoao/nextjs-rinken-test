import { Container, LinkButton, PrimaryButton, SmallHeading } from 'components/atoms'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Link from 'next/link'
import { ChangeEvent, memo, useCallback, useEffect, useMemo, useState } from 'react'

import { questions } from 'assets/questions'

type PageProps = {
  year: string
  timeframe: 'am' | 'pm'
  questionNumber: string
  questionData: typeof questions[keyof typeof questions]
}

type PathsType = {
  params: {
    year: string
    timeframe: 'am' | 'pm'
    questionNumber: string
  }
}

type Order = 'order-1' | 'order-2' | 'order-3' | 'order-4' | 'order-5'

type Orders = [Order, Order, Order, Order, Order]

const checkCircle = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

// eslint-disable-next-line react/display-name
const TimeframePage: NextPage<PageProps> = memo(({ year, timeframe, questionNumber, questionData }: PageProps) => {
  const [currentNumber, setCurrentNumber] = useState<number>(1)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [orders, setOrders] = useState<Orders>(['order-1', 'order-2', 'order-3', 'order-4', 'order-5'])

  const timeframeToJapanese = useMemo(() => (timeframe === 'am' ? '午前' : '午後'), [timeframe])

  const currentQuestion = useMemo(() => questionData.questionData[currentNumber - 1], [currentNumber, questionData])

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, selectedIndex: number) => {
      const answerLength = questionData.answerData[currentNumber - 1].length
      setSelectedAnswers((prev) => [...prev, selectedIndex].slice(-answerLength))
    },
    [currentNumber, questionData.answerData]
  )

  const handleClick = useCallback(() => {
    console.log({ selectedAnswers })
  }, [selectedAnswers])

  useEffect(() => {
    const numberArray: Orders = ['order-1', 'order-2', 'order-3', 'order-4', 'order-5']
    const newArray = []
    for (let i = 5; i > 0; i--) {
      const randomNumber = Math.trunc(Math.random() * i)
      const removed = numberArray.splice(randomNumber, 1)[0]
      newArray.push(removed)
    }
    setOrders(newArray as Orders)
  }, [])

  return (
    <DefaultLayout title={`${questionNumber} | 臨検テスト`}>
      <Container>
        <div className="py-10">
          <Link href={`/${year}/${timeframe}`}>
            <LinkButton reverse>
              第{Number(year) - 1953}回{timeframeToJapanese}
            </LinkButton>
          </Link>

          <div className="mt-6">
            <SmallHeading>問題{currentNumber}</SmallHeading>
            <div className="mt-4">
              <p>{currentQuestion.question}</p>

              <div className="flex flex-col border border-primary-400 rounded mt-6">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={option}
                    className={`flex items-center gap-2 ${
                      orders[index] !== 'order-1' && 'border-t'
                    } border-t-primary-400 text-primary-900 px-3 min-h-[50px] relative cursor-pointer ${
                      orders[index]
                    } ${selectedAnswers.indexOf(index) >= 0 && 'bg-primary-400/20'} ${
                      selectedAnswers.indexOf(index) < 0 && 'hover:bg-primary-400/5'
                    } `}
                  >
                    <input
                      checked={selectedAnswers.indexOf(index) >= 0}
                      name="selectedAnswer"
                      type="checkbox"
                      value={index}
                      className="accent-primary-500"
                      onChange={(event) => handleChange(event, index)}
                    />
                    <span className="flex-1">{option}</span>
                  </label>
                ))}
              </div>

              <div className="mt-10">
                <PrimaryButton component="button" icon={checkCircle} onClick={handleClick}>
                  解答
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
})

export const getStaticPaths: GetStaticPaths = async () => {
  const years = ['2020', '2019', '2018', '2017', '2016', '2015']
  const timeframes: ['am', 'pm'] = ['am', 'pm']
  const questionNumbers = [
    '1-10',
    '11-20',
    '21-30',
    '31-40',
    '41-50',
    '51-60',
    '61-70',
    '71-80',
    '81-90',
    '91-100',
    '1-100',
  ]
  const paths: PathsType[] = []
  for (const year of years) {
    for (const timeframe of timeframes) {
      for (const questionNumber of questionNumbers) {
        paths.push({ params: { year, timeframe, questionNumber } })
      }
    }
  }
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const year = params?.year as '2020' | '2019' | '2018' | '2017' | '2016' | '2015' | undefined
  const timeframe = params?.timeframe as 'am' | 'pm' | undefined
  const questionNumber = params?.questionNumber
  const questionData = year && timeframe && questions[`${year}${timeframe}`]
  return {
    props: { year, timeframe, questionNumber, questionData },
  }
}

export default TimeframePage
