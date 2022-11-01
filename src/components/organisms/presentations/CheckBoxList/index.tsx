import { memo } from 'react'

type Props = {
  answers: number[]
  options: string[]
  orders: string[]
  selectedAnswers: number[]
  thinking: boolean
  handleChange: (selectedIndex: number) => void
}

// eslint-disable-next-line react/display-name
export const CheckBoxList = memo(({ answers, options, orders, selectedAnswers, thinking, handleChange }: Props) => {
  return (
    <div className="flex flex-col border border-primary-400 rounded">
      {options.map((option, index) => {
        const bgcolor = thinking
          ? selectedAnswers.indexOf(index) >= 0 && 'bg-primary-400/20'
          : answers.indexOf(index) >= 0 && 'bg-red-400/20'
        return (
          <label
            key={option}
            className={`flex items-center gap-2 ${
              orders[index] !== 'order-1' && 'border-t'
            } border-t-primary-400 text-primary-900 px-3 min-h-[50px] relative ${thinking && 'cursor-pointer'} ${
              orders[index]
            } ${bgcolor || 'bg-white'} ${thinking && selectedAnswers.indexOf(index) < 0 && 'hover:bg-primary-400/5'} `}
          >
            <input
              checked={selectedAnswers.indexOf(index) >= 0}
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
