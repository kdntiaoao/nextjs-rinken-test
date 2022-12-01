import { memo, ReactNode, useMemo } from 'react'

type Props = {
  color?: 'primary' | 'secondary' | 'warning'
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const Badge = memo(({ color = 'primary', children }: Props) => {
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
      className={`flex h-6 w-6 items-center justify-center rounded-full text-sm text-white dark:text-slate-800 ${classColor}`}
    >
      {children}
    </span>
  )
})
