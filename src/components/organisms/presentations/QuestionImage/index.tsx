import Image from 'next/image'
import { memo } from 'react'

type Props = {
  currentNumber: number
  blurDataURL: string
  imgUrl: string | undefined
  timeframe: string
  year: string
  onOpenDialog: () => void
}

// eslint-disable-next-line react/display-name
export const QuestionImage = memo(({ currentNumber, blurDataURL, imgUrl, timeframe, year, onOpenDialog }: Props) => {
  return (
    <button
      type="button"
      onClick={onOpenDialog}
      className="mx-auto mt-6 block w-fit max-w-full cursor-zoom-in overflow-x-hidden"
    >
      <div className="relative h-52 w-screen max-w-full">
        <Image
          alt={`問題${currentNumber}の画像`}
          blurDataURL={blurDataURL}
          fill
          placeholder="blur"
          priority
          src={`/images/${year}${timeframe}/${imgUrl}.jpg`}
          className="object-contain"
        />
      </div>
    </button>
  )
})
