import { ComponentPropsWithoutRef, memo, ReactNode, useMemo } from 'react'

type Props = ComponentPropsWithoutRef<'button'> & {
  color?: 'primary' | 'secondary'
  component?: 'div' | 'button'
  startIcon?: ReactNode
  endIcon?: ReactNode
  onClick?: () => void
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const PrimaryButton = memo(
  ({
    color = 'primary',
    component: CustomTag = 'div',
    disabled,
    startIcon,
    endIcon,
    onClick,
    children,
    ...rest
  }: Props) => {
    return (
      <CustomTag
        type={CustomTag === 'button' ? 'button' : undefined}
        className={`flex items-center justify-center gap-2 rounded-full text-white py-3 px-3 sm:px-8 relative text-center cursor-pointer w-full ${
          color === 'primary' && 'bg-primary-500 hover:bg-primary-600'
        } ${color === 'secondary' && 'bg-secondary-500 hover:bg-secondary-600'}`}
        disabled={disabled}
        aria-label={rest['aria-label']}
        onClick={onClick}
      >
        <span className="absolute top-1/2 left-4 -translate-y-1/2">{startIcon}</span>
        {children}
        <span className="absolute top-1/2 right-4 -translate-y-1/2">{endIcon}</span>
      </CustomTag>
    )
  }
)
