import { NextPage } from 'next'
import { ChangeEvent, memo, useCallback, useState } from 'react'

import { Container, PageHeading } from 'components/atoms'
import { SearchField } from 'components/molecules'
import { DefaultLayout } from 'components/template/DefaultLayout'

const years = [2020, 2019, 2018, 2017, 2016, 2015]

const chevronRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
)

const range = (start: number, end: number) => {
  return Array(end - start + 1)
    .fill(start)
    .map((number, idx) => number + idx)
}

// eslint-disable-next-line react/display-name
const SearchPage: NextPage = memo(() => {
  const [word, setWord] = useState<string>('')

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value)
  }, [])

  const handleSearch = useCallback(() => console.log(word), [word])

  return (
    <DefaultLayout title="臨検テスト">
      <Container>
        <div className="py-10">
          <PageHeading component="h1">検索</PageHeading>

          <div className="mt-12">
            <SearchField word={word} handleChange={handleChange} handleSearch={handleSearch} />
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
})

export default SearchPage
