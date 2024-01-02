import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { Providers } from '@/components'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <header>
            <div className="z-10 flex h-16 items-center justify-between border-b border-primary-100 bg-white px-4 xl:left-0 xl:right-0 xl:top-0 xl:h-20 dark:border-slate-600 dark:bg-slate-800">
              <Link href="/" className="flex min-h-[48px] items-center text-xl font-bold">
                臨検テスト
              </Link>
            </div>
          </header>

          <main className="p-4">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
