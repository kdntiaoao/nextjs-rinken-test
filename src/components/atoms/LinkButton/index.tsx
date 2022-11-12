import { memo, ReactNode } from 'react'

type Props = {
  reverse?: boolean
  children: ReactNode
}

const chevronRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="-mr-1 h-5 w-5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
)

const chevronLeft = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="-ml-1 h-5 w-5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
)

// eslint-disable-next-line react/display-name
export const LinkButton = memo(({ reverse = false, children }: Props) => {
  return (
    <div className="relative flex w-fit items-center gap-1 before:absolute before:bottom-0 before:left-0 before:right-0 before:block before:h-px before:scale-x-0 before:bg-primary-900 before:transition hover:before:scale-100 dark:before:bg-white">
      {reverse && chevronLeft}
      {children}
      {!reverse && chevronRight}
    </div>
  )
})
