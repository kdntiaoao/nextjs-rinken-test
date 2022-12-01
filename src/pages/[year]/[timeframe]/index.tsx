import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Link from 'next/link'
import { memo, useCallback, useMemo } from 'react'

import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useUpdateAtom } from 'jotai/utils'

import { answeringAtom } from 'atoms/answeringAtom'
import { Container, LinkButton, PageHeading, PrimaryButton } from 'components/atoms'
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

// eslint-disable-next-line react/display-name
const TimeframePage: NextPage<PageProps> = memo(({ year, timeframe }: PageProps) => {
  const setAnswering = useUpdateAtom(answeringAtom)

  const timeframeToJapanese = useMemo(() => (timeframe === 'am' ? '午前' : '午後'), [timeframe])

  const handleClick = useCallback(
    (firstNumber: number, lastNumber: number) => {
      setAnswering({ firstNumber, lastNumber, currentNumber: firstNumber, correctCount: 0, selectedAnswers: [] })
    },
    [setAnswering]
  )

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
            <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8 md:grid-cols-4">
              {[...Array(10)].map((_, index) => (
                <li key={index.toString()} className="break-keep">
                  <Link
                    href={`/${year}/${timeframe}/${index * 10 + 1}-${index * 10 + 10}`}
                    onClick={() => handleClick(index * 10 + 1, index * 10 + 10)}
                  >
                    <PrimaryButton variant="outlined" endIcon={<ChevronRightIcon className="h-5 w-5" />}>
                      {index * 10 + 1}〜{index * 10 + 10}
                    </PrimaryButton>
                  </Link>
                </li>
              ))}
              <li className="break-keep">
                <Link href={`/${year}/${timeframe}/1-100`} onClick={() => handleClick(1, 100)}>
                  <PrimaryButton variant="outlined" endIcon={<ChevronRightIcon className="h-5 w-5" />}>
                    1〜100
                  </PrimaryButton>
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
