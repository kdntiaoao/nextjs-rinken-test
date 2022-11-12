import Head from 'next/head'
import { memo, ReactNode } from 'react'

import { HeaderContainer } from 'components/organisms'

type Props = {
  title?: string
  description?: string
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const DefaultLayout = memo(
  ({
    title = '臨検テスト',
    description = '臨床検査技師の過去問題を解答することができるWebアプリケーションです。',
    children,
  }: Props) => {
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Head>

        <div className="min-h-screen flex flex-col">
          <HeaderContainer />
          <main className="flex-1 relative">{children}</main>
          <footer className="py-4 text-center select-none">
            <small className="text-gray-500">&copy;臨検テスト</small>
          </footer>
        </div>
      </>
    )
  }
)
