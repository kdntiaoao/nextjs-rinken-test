import { NextPage } from 'next'
import Link from 'next/link'
import { memo } from 'react'

import { Container, PrimaryButton } from 'components/atoms'
import { DefaultLayout } from 'components/template/DefaultLayout'

const chevronRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
)

// eslint-disable-next-line react/display-name
const NotFoundPage: NextPage = memo(() => {
  return (
    <DefaultLayout title="臨検テスト">
      <Container className="absolute inset-0 flex items-center justify-center">
        <div>
          <h1 className="text-center font-bold sm:text-xl md:text-3xl">お探しのページが見つかりません</h1>
          <div className="mt-20">
            <div className="max-w-full md:w-80 mx-auto">
              <Link href="/">
                <PrimaryButton shape="rounded-full" variant="contained" endIcon={chevronRight}>
                  トップページ
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
})

export default NotFoundPage
