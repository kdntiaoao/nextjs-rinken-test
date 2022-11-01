import { memo, ReactNode, useMemo } from 'react'

type Props = {
  color?: 'primary' | 'secondary'
  component?: 'div' | 'button'
  icon?: ReactNode
  onClick?: () => void
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const PrimaryButton = memo(
  ({ color = 'primary', component: CustomTag = 'div', icon, onClick, children }: Props) => {
    return (
      <CustomTag
        type={CustomTag === 'button' ? 'button' : undefined}
        className={`flex items-center justify-center gap-2 rounded-full text-white py-3 px-8 relative text-center cursor-pointer w-full ${
          color === 'primary' && 'bg-primary-500 hover:bg-primary-600'
        } ${color === 'secondary' && 'bg-secondary-500 hover:bg-secondary-600'}`}
        onClick={onClick}
      >
        {icon}
        {children}
      </CustomTag>
    )
  }
)
