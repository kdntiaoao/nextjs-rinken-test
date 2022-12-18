import { memo } from 'react'

type Props = {
  correct: boolean
}

// eslint-disable-next-line react/display-name
export const ResultIcon = memo(({ correct }: Props) => {
  return (
    <div role="status" aria-label={correct ? '正解' : '不正解'}>
      {correct ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="h-60 w-60 text-red-400/40"
        >
          <circle cx={12} cy={12} r={10} strokeWidth={3} stroke="currentColor" fill="none" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="h-80 w-80 text-blue-400/40"
        >
          <path d="M6.4 19.45 4.55 17.6l5.6-5.6-5.6-5.6L6.4 4.55l5.6 5.6 5.6-5.6 1.85 1.85-5.6 5.6 5.6 5.6-1.85 1.85-5.6-5.6Z" />
        </svg>
      )}
    </div>
  )
})
