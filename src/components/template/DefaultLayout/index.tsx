import Head from 'next/head'
import { memo, ReactNode } from 'react'

import { Container } from 'components/atoms'
import { HeaderContainer } from 'components/organisms'

type Props = {
  title?: string
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const DefaultLayout = memo(({ title = 'お問合せフォーム', children }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="min-h-screen flex flex-col">
        <HeaderContainer />
        <main className="flex-1 relative">{children}</main>
        <footer className="py-4 text-center select-none">
          <small className="text-gray-400">&copy;臨検テスト</small>
        </footer>
      </div>
    </>
  )
})
