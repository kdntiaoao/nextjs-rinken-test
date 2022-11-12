import { memo, ReactNode } from 'react'

type Props = {
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const MarkerHeading = memo(({ component: CustomTag = 'p', children }: Props) => {
  return (
    <CustomTag>
      <span className="relative before:absolute before:bottom-0 before:right-0 before:left-0 before:-z-10 before:block before:h-2 before:bg-primary-400/40">
        {children}
      </span>
    </CustomTag>
  )
})
