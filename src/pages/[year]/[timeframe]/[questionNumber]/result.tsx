import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useEffect, useMemo } from 'react'

import { questions } from 'assets/questions'
import { CircleProgress, Container, LinkButton, PageHeading, SmallHeading } from 'components/atoms'
import { LoadingScreen } from 'components/molecules'
import { QuestionAccordionContainer } from 'components/organisms'
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

const range = (start: number, end: number) => {
  return Array(end - start + 1)
    .fill(start)
    .map((number, idx) => number + idx)
}

// eslint-disable-next-line react/display-name
const ResultPage: NextPage<PageProps> = memo(({ year, timeframe, questionNumber, questionData }: PageProps) => {
  const router = useRouter()

  const selectedAnswers = router.query.selectedAnswers as string[] | undefined
  const correctCount = router.query.correctCount ? Number(router.query.correctCount) : 0
  const percent = selectedAnswers && correctCount ? correctCount / selectedAnswers.length : 0

  const timeframeToJapanese = useMemo(() => (timeframe === 'am' ? '午前' : '午後'), [timeframe])

  useEffect(() => {
    if (
      router?.query &&
      (typeof correctCount === 'undefined' || typeof selectedAnswers === 'undefined' || selectedAnswers.length === 0)
    ) {
      router.push(`/${year}/${timeframe}/${questionNumber}`)
    }
  }, [correctCount, questionNumber, router, selectedAnswers, timeframe, year])

  if (!selectedAnswers) {
    return <LoadingScreen />
  }

  return (
    <DefaultLayout title={`${questionNumber} | 臨検テスト`}>
      <Container>
        <div className="py-10">
          <Link href={`/${year}/${timeframe}`}>
            <LinkButton reverse>
              第{Number(year) - 1953}回{timeframeToJapanese}
            </LinkButton>
          </Link>

          <div className="mt-4 relative">
            <PageHeading component="h2">結果</PageHeading>
          </div>
          <div className="mt-8">
            <div className="w-80 h-80 max-w-full mx-auto">
              <CircleProgress percent={percent}>
                <div className="text-center">
                  <p className="text-primary-900 font-bold">
                    <span className="text-3xl mr-2">{Math.round(percent * 100)}</span>%
                  </p>
                  <p className="mt-4">
                    <span className="text-sm text-gray-400">
                      {correctCount}問正解 / {selectedAnswers.length}問中
                    </span>
                  </p>
                </div>
              </CircleProgress>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4">
            {range(Number(questionNumber.split('-')[0]), Number(questionNumber.split('-')[1])).map((number, index) => (
              <QuestionAccordionContainer
                key={number}
                answer={questionData.answerData[number - 1]}
                question={questionData.questionData[number - 1].question}
                questionNumber={number}
                options={questionData.questionData[number - 1].options}
                selectedAnswer={selectedAnswers[index]}
              />
            ))}
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

export default ResultPage
