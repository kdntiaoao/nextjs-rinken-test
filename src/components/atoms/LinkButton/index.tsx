import { memo, ReactNode } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

type Props = {
  reverse?: boolean
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const LinkButton = memo(({ reverse = false, children }: Props) => {
  return (
    <div className="relative -inset-1 flex w-fit items-center gap-1 before:absolute before:bottom-0 before:left-0 before:right-0 before:block before:h-px before:scale-x-0 before:bg-primary-900 before:transition  after:absolute after:-top-2 after:left-0 after:right-0 after:-bottom-2 after:block dark:before:bg-white [@media(any-hover:hover){&:hover}]:before:scale-x-100">
      {reverse && <ChevronLeftIcon className="-ml-1 h-5 w-5" />}
      {children}
      {!reverse && <ChevronRightIcon className="-mr-1 h-5 w-5" />}
    </div>
  )
})
