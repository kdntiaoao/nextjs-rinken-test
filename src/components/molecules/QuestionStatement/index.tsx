import Image from 'next/image'
import { memo } from 'react'

import { MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline'

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
          className="relative mx-auto mt-6 block w-fit cursor-zoom-in text-black/40 md:hover:text-black"
        >
          <Image
            priority
            width={200}
            height={200}
            src={`/images/${year}${timeframe}/${imgUrl}.jpg`}
            alt={`問題${currentNumber}の画像`}
            className="w-auto"
          />
          <span className="absolute bottom-4 right-4">{<MagnifyingGlassPlusIcon className="h-6 w-6" />}</span>
        </button>
      )}
    </>
  )
})
