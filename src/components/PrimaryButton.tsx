import { CSSProperties, ComponentProps } from 'react'

type Props = ComponentProps<'button'>

export const PrimaryButton = ({ children, ...props }: Props) => {
  const styles: CSSProperties = {}

  if (props.disabled) {
    styles.filter = 'grayscale(1)'
  }

  return (
    <button
      type="button"
      {...props}
      className="grid place-content-center rounded bg-primary-600 px-4 py-2 font-bold text-white hover:bg-primary-700"
      style={styles}
    >
      {children}
    </button>
  )
}
