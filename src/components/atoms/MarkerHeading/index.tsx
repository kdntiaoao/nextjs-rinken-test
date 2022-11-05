import { memo, ReactNode } from 'react'

type Props = {
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const MarkerHeading = memo(({ component: CustomTag = 'p', children }: Props) => {
  return (
    <CustomTag className="text-primary-900">
      <span className="before:block before:absolute before:h-2 before:bottom-0 before:right-0 before:left-0 before:bg-primary-400/40 before:-z-10 relative">
        {children}
      </span>
    </CustomTag>
  )
})
