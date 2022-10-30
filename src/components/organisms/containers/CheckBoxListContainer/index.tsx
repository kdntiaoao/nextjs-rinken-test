import { memo, useEffect, useState } from 'react'

import { CheckBoxList } from 'components/organisms/presentations/CheckBoxList'

type Props = {
  answers: number[]
  options: string[]
  selectedAnswers: number[]
  thinking: boolean
  handleChange: (selectedIndex: number) => void
}

// eslint-disable-next-line react/display-name
export const CheckBoxListContainer = memo(({ answers, options, selectedAnswers, thinking, handleChange }: Props) => {
  const [orders, setOrders] = useState(['order-1', 'order-2', 'order-3', 'order-4', 'order-5'])

  useEffect(() => {
    const numberArray = ['order-1', 'order-2', 'order-3', 'order-4', 'order-5']
    const newArray = []
    for (let i = 5; i > 0; i--) {
      const randomNumber = Math.trunc(Math.random() * i)
      const removed = numberArray.splice(randomNumber, 1)[0]
      newArray.push(removed)
    }
    setOrders(newArray)
  }, [])

  return (
    <CheckBoxList
      answers={answers}
      options={options}
      orders={orders}
      selectedAnswers={selectedAnswers}
      thinking={thinking}
      handleChange={handleChange}
    />
  )
})
