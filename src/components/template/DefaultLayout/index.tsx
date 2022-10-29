import Head from 'next/head'
import { memo, ReactNode } from 'react'

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
        <header className="py-4 bg-primary-400 text-primary-900">
          <div className="container mx-auto px-4">
            <h1 className="text-xl font-bold">臨検テスト</h1>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="py-4 text-center">
          <small className="text-gray-400">&copy;臨検テスト</small>
        </footer>
      </div>
    </>
  )
})
