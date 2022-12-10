import { ComponentPropsWithoutRef, memo, ReactNode, useMemo } from 'react'

type Props = ComponentPropsWithoutRef<'button'> & {
  color?: 'primary' | 'secondary'
  component?: 'span' | 'button'
  shape?: 'square' | 'rounded' | 'rounded-full'
  size?: 'sm' | 'base'
  variant?: 'contained' | 'outlined' | 'text'
  startIcon?: ReactNode
  endIcon?: ReactNode
  onClick?: () => void
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const PrimaryButton = memo(
  ({
    color = 'primary',
    component: CustomTag = 'button',
    disabled,
    shape = 'rounded',
    size = 'base',
    type,
    variant = 'text',
    startIcon,
    endIcon,
    onClick,
    children,
    ...rest
  }: Props) => {
    const bgcolor = useMemo(() => {
      if (variant === 'contained') {
        return color === 'primary'
          ? 'bg-primary-600 text-white [@media(any-hover:hover){&:hover}]:bg-primary-700 active:bg-primary-800'
          : 'bg-secondary-600 text-white [@media(any-hover:hover){&:hover}]:bg-secondary-700 active:bg-secondary-800'
      } else if (variant === 'outlined') {
        return color === 'primary'
          ? 'border border-primary-400 text-primary-900 [@media(any-hover:hover){&:hover}]:bg-primary-400/10 active:bg-primary-400/20 dark:text-white'
          : 'border border-secondary-400 text-secondary-900 [@media(any-hover:hover){&:hover}]:bg-primary-400/10 active:bg-primary-400/20 dark:text-white'
      } else {
        return color === 'primary'
          ? 'text-primary-900 [@media(any-hover:hover){&:hover}]:bg-primary-400/10 active:bg-primary-400/20 dark:text-white'
          : 'text-secondary-900 [@media(any-hover:hover){&:hover}]:bg-secondary-400/10 active:bg-secondary-400/20 dark:text-white'
      }
    }, [color, variant])

    const paddingY = useMemo(() => {
      if (size === 'sm') {
        return 'py-2'
      } else if (size === 'base') {
        return 'py-3'
      }
    }, [size])

    return (
      <CustomTag
        type={type || (CustomTag === 'button' ? 'button' : undefined)}
        className={`relative flex w-full select-none items-center justify-center gap-2 overflow-hidden ${paddingY} px-3 text-center sm:px-8 ${
          shape === 'square' ? '' : shape
        } ${bgcolor}`}
        disabled={disabled}
        aria-label={rest['aria-label']}
        onClick={onClick}
      >
        <span className={`absolute top-1/2 -translate-y-1/2 ${shape === 'rounded-full' ? 'left-4' : 'left-2'}`}>
          {startIcon}
        </span>
        {children}
        <span className={`absolute top-1/2 -translate-y-1/2 ${shape === 'rounded-full' ? 'right-4' : 'right-2'}`}>
          {endIcon}
        </span>
      </CustomTag>
    )
  }
)
