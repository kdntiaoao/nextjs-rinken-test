import { memo } from 'react'

import { Bars3Icon } from '@heroicons/react/24/outline'

type Props = {
  onOpen: () => void
}

// eslint-disable-next-line react/display-name
export const HeaderMenuButton = memo(({ onOpen }: Props) => {
  return (
    <button
      type="button"
      className="flex h-12 w-12 select-none items-center justify-center rounded-full active:bg-primary-400/20 dark:active:bg-slate-400/20 md:hover:bg-primary-400/10 md:dark:hover:bg-slate-400/10 xl:hidden"
      onClick={onOpen}
      aria-label="メニューを開く"
    >
      {<Bars3Icon className="h-7 w-7" />}
    </button>
  )
})
