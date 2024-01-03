import { ChangeEvent, ComponentProps } from 'react'

type Props = ComponentProps<'input'> & {
  option: string
}

export const OptionListItem = ({ option, ...props }: Props) => {
  return (
    <label className="flex min-h-[44px] items-center gap-2 px-3 py-2 hover:bg-primary-400/10 has-[:checked]:bg-primary-400/20">
      <input {...props} type="checkbox" className="accent-primary-600" />
      {option}
    </label>
  )
}
