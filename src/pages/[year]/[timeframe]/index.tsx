import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'

import { ArrowTopRightOnSquareIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useUpdateAtom } from 'jotai/utils'

import { questions } from 'assets/questions'
import { answeringAtom } from 'atoms/answeringAtom'
import { Container, LinkButton, PageHeading, PrimaryButton } from 'components/atoms'
import { DefaultLayout } from 'components/template/DefaultLayout'

type PageProps = {
  year: '2021' | '2020' | '2019' | '2018' | '2017' | '2016' | '2015'
  timeframe: 'am' | 'pm'
}

type PathsType = {
  params: {
    year: string
    timeframe: 'am' | 'pm'
  }
}

// eslint-disable-next-line react/display-name
const TimeframePage: NextPage<PageProps> = ({ year, timeframe }: PageProps) => {
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
          <Link href="/" className="block w-fit">
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

          <div className="mt-12">
            <dl className="flex items-start justify-center">
              <dt className="break-keep">出典：</dt>
              <dd>
                <a
                  className="text-blue-400 underline [@media(any-hover:hover){&:hover}]:opacity-80"
                  href={questions[`${year}${timeframe}`].link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  第{Number(year) - 1953}回 臨床検査技師国家試験問題および正答について | 厚生労働省
                  <ArrowTopRightOnSquareIcon className="ml-1 inline-block h-5 w-5" />
                </a>
              </dd>
            </dl>
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const years = ['2021', '2020', '2019', '2018', '2017', '2016', '2015']
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
