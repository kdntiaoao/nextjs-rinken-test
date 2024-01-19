import { ChangeEvent, ComponentProps } from 'react'

type Props = ComponentProps<'input'> & {
  option: string
  isAnswer?: boolean
}

export const OptionListItem = ({ option, isAnswer, ...props }: Props) => {
  const isAnswer2 = props.disabled && isAnswer
  return (
    <label
      className={`flex min-h-[44px] items-center gap-2 px-3 py-2 hover:bg-primary-400/10 has-[:disabled]:pointer-events-none has-[:checked]:bg-primary-400/20 ${
        isAnswer2
          ? 'has-[:checked:disabled]:bg-red-400/20 has-[:disabled]:bg-red-400/20'
          : 'has-[:checked:disabled]:bg-blue-400/20'
      }`}
    >
      <input {...props} type="checkbox" className="accent-primary-600" />
      {option} {isAnswer2 ? 'true' : 'false'}
    </label>
  )
}
