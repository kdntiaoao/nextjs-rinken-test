import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useEffect, useMemo } from 'react'

import { questions } from 'assets/questions'
import { CircleProgress, Container, LinkButton, PageHeading } from 'components/atoms'
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

// eslint-disable-next-line react/display-name
const ResultPage: NextPage<PageProps> = memo(({ year, timeframe, questionNumber, questionData }: PageProps) => {
  const router = useRouter()

  const timeframeToJapanese = useMemo(() => (timeframe === 'am' ? '午前' : '午後'), [timeframe])

  const correctCount = useMemo(() => {
    const results = router?.query?.results as string[] | undefined
    return results && results.reduce<number>((previous: number, current: string) => previous + Number(current), 0)
  }, [router?.query?.results])
  const percent = useMemo(() => {
    if (typeof correctCount === 'undefined' || typeof router.query.results === 'undefined') {
      return 0
    }
    return correctCount / router.query.results.length
  }, [correctCount, router.query.results])

  useEffect(() => {
    if (router?.query && (!router.query.results || router.query.results.length === 0)) {
      router.push(`/${year}/${timeframe}/${questionNumber}`)
    }
  }, [questionNumber, router, timeframe, year])

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
                  <div className="mt-4">
                    <p className="text-sm text-gray-400">
                      {correctCount}問正解 / {router.query.results?.length}問中
                    </p>
                  </div>
                </div>
              </CircleProgress>
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

export default ResultPage
