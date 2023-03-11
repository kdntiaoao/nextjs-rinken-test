import { memo, ReactNode } from 'react'

type Props = {
  onClose: () => void
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const FilterGroup = memo(({ onClose, children }: Props) => {
  return (
    <div
      className="fixed top-0 left-0 bottom-0 right-0 z-10 grid place-content-center bg-black/40 p-10"
      onClick={onClose}
    >
      <div
        className="max-h-full max-w-full overflow-y-scroll bg-white p-8 dark:bg-slate-800"
        onClick={(ev) => ev.stopPropagation()}
      >
        <div className="flex justify-between gap-8">
          <h2 className="text-xl font-bold sm:text-2xl">フィルター</h2>
          <button
            type="button"
            className="-translate-y-2 rounded-full p-2 [@media(any-hover:hover){&:hover}]:bg-primary-400/10 dark:[@media(any-hover:hover){&:hover}]:bg-slate-400/10"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="relative mt-6 flex flex-wrap gap-8">{children}</div>
      </div>
    </div>
  )
})
