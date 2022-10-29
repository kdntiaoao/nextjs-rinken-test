import { Container, IconOutlinedButton, LinkButton, PageHeading } from 'components/atoms'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useMemo } from 'react'

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
const AmPage: NextPage = memo(() => {
  const router = useRouter()

  const year = useMemo(() => Number(router.query.year), [router])

  return (
    <DefaultLayout title={`foo`}>
      <Container>
        <div className="py-10">
          <Link href="/">
            <LinkButton reverse>問題一覧へ</LinkButton>
          </Link>

          <div className="mt-4">
            <PageHeading component="h2">第{year - 1953}回午前</PageHeading>
          </div>

          <div className="mt-8">
            <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-8">
              {[...Array(10)].map((_, index) => (
                <li key={index.toString()} className="break-keep">
                  <IconOutlinedButton icon={chevronRight}>
                    {index * 10 + 1}〜{index * 10 + 10}
                  </IconOutlinedButton>
                </li>
              ))}
              <li className="break-keep">
                <IconOutlinedButton icon={chevronRight}>1〜100</IconOutlinedButton>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
})

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { year: '2020' } },
      { params: { year: '2019' } },
      { params: { year: '2018' } },
      { params: { year: '2017' } },
      { params: { year: '2016' } },
      { params: { year: '2015' } },
    ],
    fallback: false, // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  return {
    props: {},
  }
}

export default AmPage
