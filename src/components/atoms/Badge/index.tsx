import { ComponentPropsWithoutRef, memo, ReactNode, useMemo } from 'react'

type Props = ComponentPropsWithoutRef<'span'> & {
  color?: 'primary' | 'secondary' | 'warning'
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const Badge = memo(({ color = 'primary', children, ...rest }: Props) => {
  const classColor = useMemo(() => {
    if (color === 'primary') {
      return 'bg-primary-600 dark:bg-primary-400'
    } else if (color === 'secondary') {
      return 'bg-secondary-600 dark:bg-secondary-400'
    } else if (color === 'warning') {
      return 'bg-orange-700 dark:bg-amber-500'
    }
  }, [color])
  return (
    <span
      role="status"
      className={`flex min-h-[20px] min-w-[20px] items-center justify-center rounded-full p-0.5 text-xs text-white dark:text-slate-800 ${classColor}`}
      {...rest}
    >
      {children}
    </span>
  )
})
