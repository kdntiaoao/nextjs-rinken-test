import { memo, ReactNode } from 'react'

import { FilterTitle } from 'components/atoms'

type Props = {
  title: string
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const FilterCategory = memo(({ title, children }: Props) => {
  return (
    <div className="min-w-max">
      <FilterTitle>{title}</FilterTitle>
      {children}
    </div>
  )
})
