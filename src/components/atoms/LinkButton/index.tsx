import { memo, ReactNode } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

type Props = {
  reverse?: boolean
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const LinkButton = memo(({ reverse = false, children }: Props) => {
  return (
    <div className="relative flex w-fit items-center gap-1 before:absolute before:bottom-0 before:left-0 before:right-0 before:block before:h-px before:scale-x-0 before:bg-primary-900 before:transition hover:before:scale-100 dark:before:bg-white">
      {reverse && <ChevronLeftIcon className="-ml-1 h-5 w-5" />}
      {children}
      {!reverse && <ChevronRightIcon className="-mr-1 h-5 w-5" />}
    </div>
  )
})
