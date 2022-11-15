import { NextPage } from 'next'
import Link from 'next/link'
import { memo } from 'react'

import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { Container, PrimaryButton } from 'components/atoms'
import { DefaultLayout } from 'components/template/DefaultLayout'

// eslint-disable-next-line react/display-name
const NotFoundPage: NextPage = memo(() => {
  return (
    <DefaultLayout title="臨検テスト">
      <Container className="absolute inset-0 flex items-center justify-center">
        <div>
          <h1 className="text-center font-bold sm:text-xl md:text-3xl">お探しのページが見つかりません</h1>
          <div className="mt-20">
            <div className="mx-auto max-w-full md:w-80">
              <Link href="/">
                <PrimaryButton
                  shape="rounded-full"
                  variant="contained"
                  endIcon={<ChevronRightIcon className="h-6 w-6" />}
                >
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
