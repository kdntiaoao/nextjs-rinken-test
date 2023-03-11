import { memo, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const FilterTitle = memo(({ children }: Props) => {
  return <h3 className="font-bold">{children}</h3>
})
