import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useEffect } from 'react'

import { useAtomValue } from 'jotai'
import CountUp from 'react-countup'

import { questions } from 'assets/questions'
import { answeringAtom } from 'atoms/answeringAtom'
import { CircleProgress, Container, LinkButton, PageHeading } from 'components/atoms'
import { LoadingScreen } from 'components/molecules'
import { QuestionAccordionContainer } from 'components/organisms'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { getRangeArray, timeframeToJapanese } from 'utils'

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

// eslint-disable-next-line react/display-name
const ResultPage: NextPage<PageProps> = memo(({ year, timeframe, questionNumber, questionData }: PageProps) => {
  const router = useRouter()
  const answering = useAtomValue(answeringAtom)
  const percent = answering ? answering.correctCount / answering.selectedAnswers.length : 0

  useEffect(() => {
    if (!answering) {
      router.push(`/${year}/${timeframe}/${questionNumber}`)
    }
  }, [answering, questionNumber, router, timeframe, year])

  if (!answering) {
    return <LoadingScreen />
  }

  return (
    <DefaultLayout title={`第${Number(year) - 1953}回${timeframeToJapanese(timeframe)}${questionNumber} | 臨検テスト`}>
      <Container>
        <div className="py-10">
          <Link href={`/${year}/${timeframe}`}>
            <LinkButton reverse>
              第{Number(year) - 1953}回{timeframeToJapanese(timeframe)}
            </LinkButton>
          </Link>

          <div className="mt-4 relative">
            <PageHeading component="h1">結果</PageHeading>
          </div>
          <div className="mt-8">
            <div className="w-80 h-80 max-w-full mx-auto">
              <CircleProgress percent={percent}>
                <div className="text-center">
                  <p className="text-primary-900 font-bold text-3xl">
                    <span className="text-6xl mr-2">
                      <CountUp start={0} end={Math.round(percent * 100)} duration={1} />
                    </span>
                    %
                  </p>
                  <p className="mt-4">
                    <span className="text-gray-400">
                      {answering.correctCount}問正解 / {answering.selectedAnswers.length}問中
                    </span>
                  </p>
                </div>
              </CircleProgress>
            </div>
          </div>

          <div className="mt-10 border border-primary-400 rounded overflow-hidden">
            {getRangeArray(answering.firstNumber, answering.lastNumber).map((number, index) => {
              return (
                <div key={number} className={`${index !== 0 && 'border-t border-t-primary-400'}`}>
                  <QuestionAccordionContainer
                    answer={questionData.answerData[number - 1].map((answer) => answer - 1)}
                    question={questionData.questionData[number - 1]}
                    questionNumber={number}
                    timeframe={timeframe}
                    year={year}
                    selectedAnswer={answering.selectedAnswers[index]}
                  />
                </div>
              )
            })}
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
