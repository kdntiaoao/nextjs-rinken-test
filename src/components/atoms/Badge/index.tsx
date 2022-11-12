import { memo, ReactNode, useMemo } from 'react'

type Props = {
  color?: 'primary' | 'secondary'
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const Badge = memo(({ color = 'primary', children }: Props) => {
  const classColor = useMemo(() => {
    if (color === 'primary') {
      return 'bg-primary-600 dark:bg-primary-400'
    } else if (color === 'secondary') {
      return 'bg-secondary-600 dark:bg-secondary-400'
    }
  }, [color])
  return <span className={`text-white rounded-full w-6 h-6 text-sm flex items-center justify-center dark:text-slate-800 ${classColor}`}>{children}</span>
})
