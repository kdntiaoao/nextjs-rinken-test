import { memo } from 'react'

import { SmallHeading } from 'components/atoms'

type Props = {
  currentNumber: number
  question: string
}

// eslint-disable-next-line react/display-name
export const QuestionStatement = memo(({ currentNumber, question }: Props) => {
  return (
    <>
      <SmallHeading>問題{currentNumber}</SmallHeading>
      <div className="mt-4">
        <p>{question}</p>
      </div>
    </>
  )
})
