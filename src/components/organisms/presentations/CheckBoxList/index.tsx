import { memo } from 'react'

type Props = {
  answer: number[]
  options: string[]
  orders: string[]
  selectedAnswer: number[]
  thinking: boolean
  // eslint-disable-next-line no-unused-vars
  handleChange: (selectedIndex: number) => void
}

// eslint-disable-next-line react/display-name
export const CheckBoxList = memo(({ answer, options, orders, selectedAnswer, thinking, handleChange }: Props) => {
  return (
    <div className="flex flex-col overflow-hidden rounded border border-primary-400">
      {options.map((option, index) => {
        const bgcolor = thinking
          ? selectedAnswer.indexOf(index) >= 0 && 'bg-primary-400/20'
          : answer.indexOf(index) >= 0 && 'bg-red-400/20'
        return (
          <label
            key={option}
            className={`flex items-center gap-2 ${
              orders[index] !== 'order-1' && 'border-t'
            } relative min-h-[48px] border-t-primary-400 px-3 py-2 ${orders[index]} ${
              bgcolor || 'bg-white dark:bg-slate-800'
            } ${
              thinking && selectedAnswer.indexOf(index) < 0 && 'hover:bg-primary-400/10 dark:hover:bg-primary-400/10'
            } `}
          >
            <input
              checked={selectedAnswer.indexOf(index) >= 0}
              name="selectedAnswer"
              type="checkbox"
              value={index}
              className="accent-primary-600"
              onChange={() => handleChange(index)}
            />
            <span className="flex-1">{option}</span>
          </label>
        )
      })}
    </div>
  )
})
