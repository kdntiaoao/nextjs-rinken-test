import { memo, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const Container = memo(({ children }: Props) => {
  return <div className="container mx-auto px-4 lg:px-20">{children}</div>
})
