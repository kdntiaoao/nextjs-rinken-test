import Image from 'next/image'
import { memo } from 'react'

import { SmallHeading } from 'components/atoms'

type Props = {
  currentNumber: number
  imgUrl: string | undefined
  question: string
  timeframe: string
  year: string
  onOpenDialog: () => void
}

// eslint-disable-next-line react/display-name
export const QuestionStatement = memo(({ currentNumber, imgUrl, question, timeframe, year, onOpenDialog }: Props) => {
  return (
    <>
      <SmallHeading>問題{currentNumber}</SmallHeading>
      <div className="mt-4">
        <p>{question}</p>
      </div>

      {imgUrl && (
        <button
          type="button"
          onClick={onOpenDialog}
          className="relative mx-auto mt-6 block w-fit max-w-full cursor-zoom-in overflow-x-hidden"
        >
          <div className="h-52 w-80">
            <Image
              priority
              fill
              src={`/images/${year}${timeframe}/${imgUrl}.jpg`}
              alt={`問題${currentNumber}の画像`}
              className="object-contain"
            />
          </div>
        </button>
      )}
    </>
  )
})
