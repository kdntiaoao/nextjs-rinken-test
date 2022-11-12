import { ChangeEvent, FormEvent, memo } from 'react'

import { PrimaryButton } from 'components/atoms'

type Props = {
  word: string
  // eslint-disable-next-line no-unused-vars
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  // eslint-disable-next-line no-unused-vars
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const magnifyingGlass = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
)

// eslint-disable-next-line react/display-name
export const SearchField = memo(({ word, handleChange, onSubmit }: Props) => {
  return (
    <form className="flex flex-wrap gap-2 sm:gap-4" onSubmit={onSubmit}>
      <input
        autoFocus
        type="search"
        value={word}
        className="flex-1 appearance-none rounded-none border-b-2 border-b-primary-900 bg-white px-2 py-2 outline-none dark:border-b-primary-600 dark:bg-slate-800 sm:px-4"
        onChange={handleChange}
      />
      <div>
        <PrimaryButton component="button" shape="rounded-full" type="submit" variant="contained" aria-label="検索">
          {magnifyingGlass}
          <span className="hidden sm:inline-block">検索</span>
        </PrimaryButton>
      </div>
    </form>
  )
})
