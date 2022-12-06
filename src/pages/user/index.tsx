import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { memo, useEffect } from 'react'

import { useAtomValue } from 'jotai'

import { authUserAtom } from 'atoms/authUserAtom'
import { Container, PageHeading } from 'components/atoms'
import { LoadingScreen } from 'components/molecules'
import { DefaultLayout } from 'components/template/DefaultLayout'

// eslint-disable-next-line react/display-name
const UserPage: NextPage = memo(() => {
  const router = useRouter()
  const authUser = useAtomValue(authUserAtom)

  useEffect(() => {
    if (authUser === null) {
      router.push('/login')
    }
  }, [authUser, router])

  if (!authUser) {
    return <LoadingScreen />
  }

  return (
    <DefaultLayout title="ユーザー情報 | 臨検テスト">
      <Container>
        <div className="py-10">
          <PageHeading component="h1">ユーザー情報</PageHeading>

          <div className="mt-10 md:mt-16">
            <label htmlFor="email" className="mb-2 inline-block text-lg">
              メールアドレス
            </label>
            <input
              id="email"
              readOnly
              type="email"
              value={authUser.email || ''}
              className="block h-12 w-full rounded border border-primary-600 bg-white px-4 dark:bg-slate-800"
            />
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
})

export default UserPage
