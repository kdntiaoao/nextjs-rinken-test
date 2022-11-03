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
    <div className="flex gap-4">
      <input
        type="text"
        value={word}
        className="border-b-2 border-b-primary-900 px-4 py-2 flex-1"
        onChange={handleChange}
      />
      <div>
        <PrimaryButton type="button" onClick={handleSearch}>
          {magnifyingGlass}
          検索
        </PrimaryButton>
      </div>
    </div>
  )
})
