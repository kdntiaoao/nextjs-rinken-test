import { memo, ReactNode } from 'react'

type Props = {
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const SmallHeading = memo(({ component: CustomTag = 'p', children }: Props) => {
  return (
    <CustomTag className="text-primary-900">
      <span className="text-sm inline-block text-primary-900 bg-primary-100 border-l-4 border-l-primary-400 border-b-2 border-b-gray-200 pl-2 pr-3 py-1">
        {children}
      </span>
    </CustomTag>
  )
})
