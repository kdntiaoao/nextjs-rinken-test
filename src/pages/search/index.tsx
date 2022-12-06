import { NextPage } from 'next'
import { Fragment, memo, useCallback, useEffect, useRef, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroller'

import { questions } from 'assets/questions'
import { Container, PageHeading } from 'components/atoms'
import { LoadingScreen, SearchField } from 'components/molecules'
import { QuestionAccordionContainer } from 'components/organisms'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { Question } from 'types/question'
import { highlightWord, timeframeToJapanese } from 'utils'

type ResultQuestions = Record<keyof typeof questions, (Question & { answer: number[] })[]>

// eslint-disable-next-line react/display-name
const SearchPage: NextPage = memo(() => {
  const [hasMore, setHasMore] = useState<boolean>(true) // 検索結果が残っているか
  const [loading, setLoading] = useState<boolean>(false)
  const [searchResultNumber, setSearchResultNumber] = useState<number>(0)
  const [showNumber, setShowNumber] = useState<number>(40)
  const [resultQuestions, setResultQuestions] = useState<ResultQuestions | null>()
  const [word, setWord] = useState<string>('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | 0>(0)

  const handleSearch = useCallback(({ inputText }: { inputText: string }) => {
    let sumNumber = 0
    const results: ResultQuestions = {
      '2021am': [],
      '2021pm': [],
      '2020am': [],
      '2020pm': [],
      '2019am': [],
      '2019pm': [],
      '2018am': [],
      '2018pm': [],
      '2017am': [],
      '2017pm': [],
      '2016am': [],
      '2016pm': [],
      '2015am': [],
      '2015pm': [],
    }
    for (const UntypedquestionKey in results) {
      const questionKey = UntypedquestionKey as keyof typeof questions
      const matchQuestions = questions[questionKey].questionData
        .filter((q) => {
          // 大文字小文字を区別しない
          const regex = new RegExp(inputText, 'i')
          // 問題文または質問文にキーワードが入っているか
          return regex.test(q.question) || regex.test(q.options.join(' '))
        })
        .map((q) => ({ ...q, answer: questions[questionKey].answerData[q.num - 1] }))
      results[questionKey] = matchQuestions.slice(0, 40 - sumNumber)
      sumNumber += matchQuestions.length
      if (sumNumber > 40) break
    }
    sumNumber < 40 && setHasMore(false)
    setResultQuestions(results)
    setSearchResultNumber(
      Object.values(results)
        .map((result) => result.length)
        .reduce((accumulator, currentValue) => accumulator + currentValue)
    )
    setWord(inputText)
  }, [])

  const loadMore = useCallback(() => {
    setLoading(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setShowNumber((prev) => prev + 40)
      setLoading(false)
    }, 300)
  }, [])

  useEffect(() => {
    if (!word) {
      setResultQuestions(null)
    }
  }, [word])

  useEffect(() => {
    if (word) {
      let sumNumber = 0
      const results: ResultQuestions = {
        '2021am': [],
        '2021pm': [],
        '2020am': [],
        '2020pm': [],
        '2019am': [],
        '2019pm': [],
        '2018am': [],
        '2018pm': [],
        '2017am': [],
        '2017pm': [],
        '2016am': [],
        '2016pm': [],
        '2015am': [],
        '2015pm': [],
      }
      for (const UntypedquestionKey in results) {
        const questionKey = UntypedquestionKey as keyof typeof questions
        const matchQuestions = questions[questionKey].questionData
          .filter((q) => {
            // 大文字小文字を区別しない
            const regex = new RegExp(word, 'i')
            // 問題文または質問文にキーワードが入っているか
            return regex.test(q.question) || regex.test(q.options.join(' '))
          })
          .map((q) => ({ ...q, answer: questions[questionKey].answerData[q.num - 1] }))
        results[questionKey] = matchQuestions.slice(0, showNumber - sumNumber)
        sumNumber += matchQuestions.length
        if (sumNumber > showNumber) break
      }
      sumNumber < showNumber && setHasMore(false)
      setResultQuestions(results)
      setSearchResultNumber(
        Object.values(results)
          .map((result) => result.length)
          .reduce((accumulator, currentValue) => accumulator + currentValue)
      )
    }
  }, [showNumber, word])

  return (
    <DefaultLayout title="検索 | 臨検テスト">
      <LoadingScreen loading={loading} />
      <Container>
        <div className="py-10">
          <PageHeading component="h1">検索</PageHeading>

          <div className="mt-8 sm:mt-12">
            <SearchField onSubmit={handleSearch} />

            {word && resultQuestions && (
              <div className="mt-8 flex flex-col gap-4 sm:mt-12">
                {searchResultNumber ? (
                  <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
                    {(
                      [
                        '2020am',
                        '2020pm',
                        '2019am',
                        '2019pm',
                        '2018am',
                        '2018pm',
                        '2017am',
                        '2017pm',
                        '2016am',
                        '2016pm',
                        '2015am',
                        '2015pm',
                      ] as const
                    ).map((y) => (
                      <Fragment key={y}>
                        {resultQuestions[y].length !== 0 && (
                          <div className="mt-6 sm:mt-10">
                            <div className="mb-4">
                              <p className="text-xl">
                                第{Number(y.slice(0, 4)) - 1953}回 {timeframeToJapanese(y.slice(-2) as 'am' | 'pm')}
                              </p>
                            </div>
                            <div className="overflow-hidden rounded border border-primary-400">
                              {resultQuestions[y].map(({ num, question, img, options, answer }, index) => {
                                return (
                                  <div
                                    key={`${y}-${num}`}
                                    className={`${index !== 0 && 'border-t border-t-primary-400'}`}
                                  >
                                    <QuestionAccordionContainer
                                      answer={answer.map((answer) => answer - 1)}
                                      question={{
                                        num,
                                        question: highlightWord(question, word),
                                        img,
                                        options: options.map((option) => highlightWord(option, word)),
                                      }}
                                      questionNumber={num}
                                      timeframe={y.slice(-2) as 'am' | 'pm'}
                                      year={y.slice(0, 4)}
                                      selectedAnswer={[]}
                                    />
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </InfiniteScroll>
                ) : (
                  <p>
                    検索結果は0件です。
                    <br />
                    違うキーワードで検索してください。
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
})

export default SearchPage
