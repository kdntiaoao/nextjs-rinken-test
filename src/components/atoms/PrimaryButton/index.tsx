import { memo, ReactNode } from 'react'

type Props = {
  component?: 'div' | 'button'
  icon?: ReactNode
  onClick?: () => void
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const PrimaryButton = memo(({ component: CustomTag = 'div', icon, onClick, children }: Props) => {
  return (
    <CustomTag
      type={CustomTag === 'button' ? 'button' : undefined}
      className="flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 rounded-full text-white py-3 px-8 relative text-center cursor-pointer w-full"
      onClick={onClick}
    >
      {icon}
      {children}
    </CustomTag>
  )
})
