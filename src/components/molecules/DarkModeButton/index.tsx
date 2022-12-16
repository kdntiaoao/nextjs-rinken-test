import { memo } from 'react'

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

type Props = {
  darkMode: boolean
  onClick: () => void
}

// eslint-disable-next-line react/display-name
export const DarkModeButton = memo(({ darkMode, onClick }: Props) => {
  return (
    <button
      type="button"
      className="flex h-12 items-center"
      onClick={onClick}
      aria-label={darkMode ? 'ライトモードに変更する' : 'ダークモードに変更する'}
    >
      <span className="flex h-8 w-14 items-center rounded-full bg-gray-200 p-1 transition-all duration-300 dark:bg-slate-600">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-400 transition-all duration-300 dark:translate-x-6 dark:bg-slate-800">
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
