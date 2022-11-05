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
    className="w-5 h-5 -mr-1"
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
    className="w-5 h-5 -ml-1"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
)

// eslint-disable-next-line react/display-name
export const LinkButton = memo(({ reverse = false, children }: Props) => {
  return (
    <div className="flex w-fit items-center gap-1 cursor-pointer text-primary-900 relative before:block before:absolute before:bottom-0 before:left-0 before:right-0 before:h-px before:scale-x-0 before:bg-primary-900 before:transition hover:before:scale-100">
      {reverse && chevronLeft}
      {children}
      {!reverse && chevronRight}
    </div>
  )
})
