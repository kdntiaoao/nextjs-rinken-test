import { memo } from 'react'

type Props = {
  correct: boolean
}

// eslint-disable-next-line react/display-name
export const ResultIcon = memo(({ correct }: Props) => {
  if (correct) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="text-red-400/40 w-60 h-60"
      >
        <path d="M12 22.475q-2.2 0-4.1-.825-1.9-.825-3.312-2.237Q3.175 18 2.35 16.1q-.825-1.9-.825-4.1 0-2.2.825-4.1.825-1.9 2.238-3.313Q6 3.175 7.9 2.35q1.9-.825 4.1-.825 2.2 0 4.1.825 1.9.825 3.313 2.237Q20.825 6 21.65 7.9q.825 1.9.825 4.1 0 2.2-.825 4.1-.825 1.9-2.237 3.313Q18 20.825 16.1 21.65q-1.9.825-4.1.825Zm0-2.65q3.3 0 5.562-2.263Q19.825 15.3 19.825 12q0-3.3-2.263-5.563Q15.3 4.175 12 4.175q-3.3 0-5.562 2.262Q4.175 8.7 4.175 12t2.263 5.562Q8.7 19.825 12 19.825ZM12 12Z" />
      </svg>
    )
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="text-blue-400/40 w-80 h-80"
      >
        <path d="M6.4 19.45 4.55 17.6l5.6-5.6-5.6-5.6L6.4 4.55l5.6 5.6 5.6-5.6 1.85 1.85-5.6 5.6 5.6 5.6-1.85 1.85-5.6-5.6Z" />
      </svg>
    )
  }
})
