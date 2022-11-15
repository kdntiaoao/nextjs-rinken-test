import { ChangeEvent, FormEvent, memo } from 'react'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import { PrimaryButton } from 'components/atoms'

type Props = {
  word: string
  // eslint-disable-next-line no-unused-vars
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  // eslint-disable-next-line no-unused-vars
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

// eslint-disable-next-line react/display-name
export const SearchField = memo(({ word, handleChange, onSubmit }: Props) => {
  return (
    <form className="flex flex-wrap gap-2 sm:gap-4" onSubmit={onSubmit}>
      <input
        enterKeyHint="search"
        type="search"
        value={word}
        className="flex-1 appearance-none rounded-none border-b-2 border-b-primary-600 bg-white px-2 py-2 outline-none dark:bg-slate-800 sm:px-4"
        onChange={handleChange}
      />
      <div>
        <PrimaryButton component="button" shape="rounded-full" type="submit" variant="contained" aria-label="検索">
          {<MagnifyingGlassIcon className="h-5 w-5" />}
          <span className="hidden sm:inline-block">検索</span>
        </PrimaryButton>
      </div>
    </form>
  )
})
