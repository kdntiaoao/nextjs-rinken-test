import Link from 'next/link'
import { memo, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const HeaderTitle = memo(({ children }: Props) => {
  return (
    <Link href="/">
      <span className="flex min-h-[48px] items-center text-xl font-bold">{children}</span>
    </Link>
  )
})
