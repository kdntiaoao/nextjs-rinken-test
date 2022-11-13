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

        <div className="flex min-h-screen flex-col">
          <HeaderContainer />
          <div className="flex flex-1 flex-col overflow-x-hidden xl:pl-80 xl:pt-20">
            <main className="relative flex-1">{children}</main>
            <footer className="select-none py-4 text-center">
              <small className="text-gray-500 dark:text-slate-400">&copy;臨検テスト</small>
            </footer>
          </div>
        </div>
      </>
    )
  }
)
