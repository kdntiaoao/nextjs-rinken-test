import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Link from 'next/link'
import { memo, useCallback, useMemo, useState } from 'react'

import { questions } from 'assets/questions'
import { Container, LinkButton, PrimaryButton, SmallHeading } from 'components/atoms'
import { ResultIcon } from 'components/molecules'
import { CheckBoxListContainer } from 'components/organisms'
import { DefaultLayout } from 'components/template/DefaultLayout'

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
  const [currentNumber, setCurrentNumber] = useState<number>(Number(questionNumber.split('-')[0])) // 現在解答中の問題番号
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]) // 選択されている解答
  const [thinking, setThinking] = useState<boolean>(true) // 解答中はtrue, 答え合わせ中はfalse
  const [correct, setCorrect] = useState<boolean>(true) // 正誤フラグ

  const timeframeToJapanese = useMemo(() => (timeframe === 'am' ? '午前' : '午後'), [timeframe])
  const currentQuestion = useMemo(() => questionData.questionData[currentNumber - 1], [currentNumber, questionData])
  const answers = useMemo(
    () => questionData.answerData[currentNumber - 1].map((answer) => answer - 1),
    [currentNumber, questionData.answerData]
  )

  const handleChange = useCallback(
    (selectedIndex: number) => {
      if (thinking) {
        const answerLength = answers.length
        setSelectedAnswers((prev) => [...prev, selectedIndex].slice(-answerLength))
      }
    },
    [answers.length, thinking]
  )

  const handleAnswer = useCallback(() => {
    console.log(selectedAnswers, answers)
    const sortedAnswers = selectedAnswers.sort()
    for (let i = 0; i < answers.length; i++) {
      if (sortedAnswers[i] !== answers[i]) {
        setCorrect(false)
        break
      }
      setCorrect(true)
    }
    setThinking(false)
  }, [answers, selectedAnswers])

  const handleNextQuestion = useCallback(() => {
    setCurrentNumber((current) => current + 1)
    setThinking(true)
    setSelectedAnswers([])
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

              <div className="mt-6 relative">
                <CheckBoxListContainer
                  answers={answers}
                  options={currentQuestion.options}
                  selectedAnswers={selectedAnswers}
                  thinking={thinking}
                  handleChange={handleChange}
                />
                {!thinking && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <ResultIcon correct={correct} />
                  </div>
                )}
              </div>

              <div className="mt-10">
                {thinking ? (
                  <PrimaryButton component="button" icon={checkCircle} onClick={handleAnswer}>
                    解答する
                  </PrimaryButton>
                ) : (
                  <PrimaryButton component="button" onClick={handleNextQuestion}>
                    次の問題へ
                  </PrimaryButton>
                )}
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
