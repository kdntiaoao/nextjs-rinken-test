import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Link from 'next/link'
import { memo, useMemo } from 'react'

import { Container, IconOutlinedButton, LinkButton, PageHeading } from 'components/atoms'
import { DefaultLayout } from 'components/template/DefaultLayout'

type PageProps = {
  year: string
  timeframe: 'am' | 'pm'
}

type PathsType = {
  params: {
    year: string
    timeframe: 'am' | 'pm'
  }
}

const chevronRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
)

// eslint-disable-next-line react/display-name
const TimeframePage: NextPage<PageProps> = memo(({ year, timeframe }: PageProps) => {
  const timeframeToJapanese = useMemo(() => (timeframe === 'am' ? '午前' : '午後'), [timeframe])

  return (
    <DefaultLayout title={`第${Number(year) - 1953}回${timeframeToJapanese} | 臨検テスト`}>
      <Container>
        <div className="py-10">
          <Link href="/">
            <LinkButton reverse>問題一覧へ</LinkButton>
          </Link>

          <div className="mt-8">
            <PageHeading component="h1">
              第{Number(year) - 1953}回{timeframeToJapanese}
            </PageHeading>
          </div>

          <div className="mt-12">
            <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-8">
              {[...Array(10)].map((_, index) => (
                <li key={index.toString()} className="break-keep">
                  <Link href={`/${year}/${timeframe}/${index * 10 + 1}-${index * 10 + 10}`}>
                    <IconOutlinedButton icon={chevronRight}>
                      {index * 10 + 1}〜{index * 10 + 10}
                    </IconOutlinedButton>
                  </Link>
                </li>
              ))}
              <li className="break-keep">
                <Link href="1-100">
                  <IconOutlinedButton icon={chevronRight}>1〜100</IconOutlinedButton>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
})

export const getStaticPaths: GetStaticPaths = async () => {
  const years = ['2020', '2019', '2018', '2017', '2016', '2015']
  const timeframes: ['am', 'pm'] = ['am', 'pm']
  const paths = years.reduce<PathsType[]>(
    (previousArray, currentYears) => [
      ...previousArray,
      ...timeframes.map((timeframe) => ({ params: { year: currentYears, timeframe } })),
    ],
    []
  )
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const year = params?.year
  const timeframe = params?.timeframe
  return {
    props: { year, timeframe },
  }
}

export default TimeframePage
