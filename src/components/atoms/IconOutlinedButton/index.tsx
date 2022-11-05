import { memo, ReactNode } from 'react'

type Props = {
  component?: 'div' | 'button'
  icon: ReactNode
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const IconOutlinedButton = memo(({ component: CustomTag = 'div', icon, children }: Props) => {
  return (
    <CustomTag
      type={CustomTag === 'button' ? 'button' : undefined}
      className="block border border-primary-400 rounded text-primary-900 py-3 px-8 relative text-center hover:bg-primary-400/10 active:bg-primary-400/20"
    >
      <span className="absolute left-2 top-1/2 -translate-y-1/2">{icon}</span>
      {children}
    </CustomTag>
  )
})
