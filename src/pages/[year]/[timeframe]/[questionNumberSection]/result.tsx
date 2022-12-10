import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAtomValue } from 'jotai'
import party from 'party-js'
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
  questionNumberSection: string
  questionData: typeof questions[keyof typeof questions]['questionData']
  answerData: number[][]
}

type PathsType = {
  params: {
    year: string
    timeframe: 'am' | 'pm'
    questionNumberSection: string
  }
}

// eslint-disable-next-line react/display-name
const ResultPage: NextPage<PageProps> = ({
  year,
  timeframe,
  questionNumberSection,
  questionData,
  answerData,
}: PageProps) => {
  const router = useRouter()
  const answering = useAtomValue(answeringAtom)
  const percent = answering ? answering.correctCount / answering.selectedAnswers.length : 0

  useEffect(() => {
    if (!answering) {
      router.push(`/${year}/${timeframe}/${questionNumberSection}`)
    }
  }, [answering, questionNumberSection, router, timeframe, year])

  useEffect(() => {
    if (answering && percent >= 0.6) {
      setTimeout(() => {
        party.confetti(party.Rect.fromScreen(), {
          count: 150 * percent ** 2,
        })
      }, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!answering) {
    return <LoadingScreen />
  }

  return (
    <DefaultLayout
      title={`第${Number(year) - 1953}回${timeframeToJapanese(timeframe)}${questionNumberSection} | 臨検テスト`}
    >
      <Container>
        <div className="py-10">
          <Link href={`/${year}/${timeframe}`}>
            <LinkButton reverse>
              第{Number(year) - 1953}回{timeframeToJapanese(timeframe)}
            </LinkButton>
          </Link>

          <div className="relative mt-4">
            <PageHeading component="h1">結果</PageHeading>
          </div>
          <div className="mt-8">
            <div className="mx-auto h-80 w-80 max-w-full">
              <CircleProgress percent={percent}>
                <div className="text-center">
                  <p className="text-3xl font-bold">
                    <span className="mr-2 text-6xl">
                      <CountUp start={0} end={Math.round(percent * 100)} duration={1} />
                    </span>
                    %
                  </p>
                  <p className="mt-4">
                    <span className="text-gray-500 dark:text-gray-400">
                      {answering.correctCount}問正解 / {answering.selectedAnswers.length}問中
                    </span>
                  </p>
                </div>
              </CircleProgress>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded border border-primary-400">
            {getRangeArray(answering.firstNumber, answering.lastNumber).map((number, index) => {
              return (
                <div key={number} className={`${index !== 0 && 'border-t border-t-primary-400'}`}>
                  <QuestionAccordionContainer
                    answer={answerData[number - answering.firstNumber].map((answer) => answer - 1)}
                    question={questionData[number - answering.firstNumber]}
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
}

export const getStaticPaths: GetStaticPaths = async () => {
  const years = ['2021', '2020', '2019', '2018', '2017', '2016', '2015']
  const timeframes: ['am', 'pm'] = ['am', 'pm']
  const questionNumberSections = [
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
      for (const questionNumberSection of questionNumberSections) {
        paths.push({ params: { year, timeframe, questionNumberSection } })
      }
    }
  }
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const year = params?.year as '2021' | '2020' | '2019' | '2018' | '2017' | '2016' | '2015' | undefined
  const timeframe = params?.timeframe as 'am' | 'pm' | undefined
  const questionNumberSection = params?.questionNumberSection
  const firstNumber = Number(params?.questionNumberSection?.toString().split('-')[0])
  const lastNumber = Number(params?.questionNumberSection?.toString().split('-')[1])
  const questionData =
    year && timeframe && questions[`${year}${timeframe}`].questionData.slice(firstNumber - 1, lastNumber)
  const answerData = year && timeframe && questions[`${year}${timeframe}`].answerData.slice(firstNumber - 1, lastNumber)
  return {
    props: { year, timeframe, questionNumberSection, questionData, answerData },
  }
}

export default ResultPage
