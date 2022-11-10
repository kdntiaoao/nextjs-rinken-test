import { ChangeEvent, FormEvent, memo, useCallback } from 'react'

import { SearchField } from 'components/organisms/presentations/SearchField'

type Props = {
  word: string
  // eslint-disable-next-line no-unused-vars
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSearch: () => void
}

// eslint-disable-next-line react/display-name
export const SearchFieldContainer = memo(({ word, handleChange, onSearch }: Props) => {
  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch()
  }, [onSearch])

  return <SearchField word={word} handleChange={handleChange} onSubmit={handleSubmit} />
})
