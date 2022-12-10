import { memo, ReactNode } from 'react'

import { ChevronRightIcon } from '@heroicons/react/24/outline'

type Props = {
  pointerEvents?: boolean
  onClick?: () => void
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const HeaderNavButton = memo(({ pointerEvents = true, onClick, children }: Props) => {
  return (
    <span
      className={`flex items-center gap-4 p-4 active:bg-primary-400/20 dark:active:bg-slate-400/20 [@media(any-hover:hover){&:hover}]:bg-primary-400/10 dark:[@media(any-hover:hover){&:hover}]:bg-slate-400/10 ${
        pointerEvents || 'pointer-events-none'
      }`}
      onClick={onClick}
    >
      <span className="flex flex-1 items-center gap-2">{children}</span>
      <ChevronRightIcon className="h-6 w-6" />
    </span>
  )
})
