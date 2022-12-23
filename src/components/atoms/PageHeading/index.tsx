import { memo, ReactNode } from 'react'

type Props = {
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const PageHeading = memo(({ component: CustomTag = 'p', children }: Props) => {
  return (
    <CustomTag className="border-l-4 border-primary-400 pl-4 text-xl dark:border-l-primary-600 sm:text-2xl">
      {children}
    </CustomTag>
  )
})
