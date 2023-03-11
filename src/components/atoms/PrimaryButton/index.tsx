import { ComponentPropsWithoutRef, memo, ReactNode, useMemo } from 'react'

type Props = ComponentPropsWithoutRef<'button'> & {
  color?: 'primary' | 'secondary' | 'error'
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
        if (color === 'primary') {
          return 'bg-primary-600 text-white [@media(any-hover:hover){&:hover}]:bg-primary-700 active:bg-primary-800'
        } else if (color === 'secondary') {
          return 'bg-secondary-600 text-white [@media(any-hover:hover){&:hover}]:bg-secondary-700 active:bg-secondary-800'
        } else if (color === 'error') {
          return 'bg-error-800 text-white [@media(any-hover:hover){&:hover}]:bg-error-700 active:bg-error-600'
        }
      } else if (variant === 'outlined') {
        if (color === 'primary') {
          return 'border border-primary-400 text-primary-900 [@media(any-hover:hover){&:hover}]:bg-primary-400/10 active:bg-primary-400/20 dark:text-white'
        } else if (color === 'secondary') {
          return 'border border-secondary-400 text-secondary-900 [@media(any-hover:hover){&:hover}]:bg-secondary-400/10 active:bg-secondary-400/20 dark:text-white'
        } else if (color === 'error') {
          return 'border border-error-400 text-error-900 [@media(any-hover:hover){&:hover}]:bg-error-400/10 active:bg-error-400/20 dark:text-white'
        }
      } else if (variant === 'text') {
        if (color === 'primary') {
          return 'text-primary-900 [@media(any-hover:hover){&:hover}]:bg-primary-400/10 active:bg-primary-400/20 dark:text-white'
        } else if (color === 'secondary') {
          return 'text-secondary-900 [@media(any-hover:hover){&:hover}]:bg-secondary-400/10 active:bg-secondary-400/20 dark:text-white'
        } else if (color === 'error') {
          return 'text-error-900 [@media(any-hover:hover){&:hover}]:bg-error-400/10 active:bg-error-400/20 dark:text-white'
        }
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
        } ${bgcolor} ${rest['className']}`}
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
