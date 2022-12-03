import { ComponentPropsWithoutRef, ElementType, memo, ReactNode } from 'react'

type Props = ComponentPropsWithoutRef<ElementType> & {
  component?: ElementType
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const Box = memo(({ component: CustomTag = 'div', children, ...rest }: Props) => {
  return <CustomTag {...rest}>{children}</CustomTag>
})
