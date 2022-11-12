import { memo, ReactNode } from 'react'

type Props = {
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const SmallHeading = memo(({ component: CustomTag = 'p', children }: Props) => {
  return (
    <CustomTag>
      <span className="inline-block border-l-4 border-b-2 border-l-primary-400 border-b-gray-200 bg-primary-100 py-2 pl-3 pr-4 text-sm dark:border-b-slate-600 dark:border-l-primary-400 dark:bg-primary-600">
        {children}
      </span>
    </CustomTag>
  )
})
