import { memo, useMemo, useRef, useState } from 'react'

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

import { useDidUpdateEffect } from 'hooks'

type Props = {
  darkMode: boolean
  onClick: () => void
}

// eslint-disable-next-line react/display-name
export const DarkModeButton = memo(({ darkMode, onClick }: Props) => {
  const [grayscale, setGrayscale] = useState<boolean>(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | 0>(0)

  const containerColor = useMemo(
    () => (grayscale ? 'bg-gray-200 dark:bg-slate-600' : 'bg-yellow-200 dark:bg-violet-400'),
    [grayscale]
  )

  const iconColor = useMemo(
    () => (grayscale ? 'bg-white text-gray-400 dark:bg-slate-800' : 'bg-yellow-500 text-white dark:bg-violet-600'),
    [grayscale]
  )

  useDidUpdateEffect(() => {
    setGrayscale(false)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setGrayscale(true)
    }, 1000)
  }, [darkMode])

  return (
    <button
      type="button"
      className="flex h-12 items-center"
      onClick={onClick}
      aria-label={darkMode ? 'ライトモードに変更する' : 'ダークモードに変更する'}
    >
      <span className={`flex h-8 w-14 items-center rounded-full p-1 transition-all duration-300 ${containerColor}`}>
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 dark:translate-x-6 ${iconColor}`}
        >
          {darkMode ? (
            <MoonIcon className="h-5 w-5" strokeWidth={2} />
          ) : (
            <SunIcon className="h-5 w-5" strokeWidth={2} />
          )}
        </span>
      </span>
    </button>
  )
})
