import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { memo, useEffect } from 'react'

import { useAtomValue } from 'jotai'

import { authUserAtom } from 'atoms/authUserAtom'
import { Container, PageHeading } from 'components/atoms'
import { DefaultLayout } from 'components/template/DefaultLayout'

// eslint-disable-next-line react/display-name
const HistoryPage: NextPage = memo(() => {
  const router = useRouter()
  const authUser = useAtomValue(authUserAtom)

  useEffect(() => {
    if (authUser === null) {
      router.push('/login')
    }
  }, [authUser, router])

  return (
    <DefaultLayout title="履歴 | 臨検テスト">
      <Container>
        <div className="py-10">
          <PageHeading component="h1">履歴</PageHeading>
        </div>
      </Container>
    </DefaultLayout>
  )
})

export default HistoryPage
