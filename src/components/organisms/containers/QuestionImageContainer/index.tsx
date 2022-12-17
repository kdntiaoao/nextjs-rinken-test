import { memo } from 'react'

import { useAtomValue } from 'jotai'

import { darkModeAtom } from 'atoms/darkModeAtom'
import { QuestionImage } from 'components/organisms/presentations/QuestionImage'

type Props = {
  currentNumber: number
  imgUrl: string | undefined
  timeframe: string
  year: string
  onOpenDialog: () => void
}

const shimmer = (w: string | number, h: string | number, darkMode?: boolean) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
    <stop stop-color="${darkMode ? '#334155' : '#f3f4f6'}" offset="20%" />
    <stop stop-color="${darkMode ? '#475569' : '#e5e7eb'}" offset="50%" />
    <stop stop-color="${darkMode ? '#334155' : '#f3f4f6'}" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${darkMode ? '#334155' : '#f3f4f6'}" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)

// eslint-disable-next-line react/display-name
export const QuestionImageContainer = memo((props: Props) => {
  const darkMode = useAtomValue(darkModeAtom)

  return (
    <QuestionImage
      {...props}
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer('100%', '100%', !!darkMode))}`}
    />
  )
})
