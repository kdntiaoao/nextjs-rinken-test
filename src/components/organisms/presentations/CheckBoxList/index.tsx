import { memo } from 'react'

type Props = {
  answer: number[]
  options: string[]
  orders: string[]
  selectedAnswer: number[]
  thinking: boolean
  handleChange: (selectedIndex: number) => void
}

// eslint-disable-next-line react/display-name
export const CheckBoxList = memo(({ answer, options, orders, selectedAnswer, thinking, handleChange }: Props) => {
  return (
    <div className="flex flex-col border border-primary-400 text-primary-900 rounded overflow-hidden">
      {options.map((option, index) => {
        const bgcolor = thinking
          ? selectedAnswer.indexOf(index) >= 0 && 'bg-primary-400/20'
          : answer.indexOf(index) >= 0 && 'bg-red-400/20'
        return (
          <label
            key={option}
            className={`flex items-center gap-2 ${
              orders[index] !== 'order-1' && 'border-t'
            } border-t-primary-400 px-3 py-2 min-h-[48px] relative ${orders[index]} ${bgcolor || 'bg-white'} ${
              thinking && selectedAnswer.indexOf(index) < 0 && 'hover:bg-primary-400/10'
            } `}
          >
            <input
              checked={selectedAnswer.indexOf(index) >= 0}
              name="selectedAnswer"
              type="checkbox"
              value={index}
              className="accent-primary-500"
              onChange={() => handleChange(index)}
            />
            <span className="flex-1">{option}</span>
          </label>
        )
      })}
    </div>
  )
})
