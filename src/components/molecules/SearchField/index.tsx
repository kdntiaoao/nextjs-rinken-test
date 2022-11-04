import { ChangeEvent, memo } from 'react'

import { PrimaryButton } from 'components/atoms'

type Props = {
  word: string
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSearch: () => void
}

const magnifyingGlass = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
)

// eslint-disable-next-line react/display-name
export const SearchField = memo(({ word, handleChange, handleSearch }: Props) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-4">
      <input
        type="search"
        value={word}
        className="border-b-2 border-b-primary-900 px-2 sm:px-4 py-2 flex-1 outline-none"
        onChange={handleChange}
      />
      <div>
        <PrimaryButton component="button" aria-label="検索" onClick={handleSearch}>
          {magnifyingGlass}
          <span className="hidden sm:inline-block">検索</span>
        </PrimaryButton>
      </div>
    </div>
  )
})
