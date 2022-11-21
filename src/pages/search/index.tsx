import { NextPage } from 'next'
import { Fragment, memo, useCallback, useEffect, useState } from 'react'

import { questions } from 'assets/questions'
import { Container, PageHeading } from 'components/atoms'
import { SearchField } from 'components/molecules'
import { QuestionAccordionContainer } from 'components/organisms'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { Question } from 'types/question'
import { highlightWord, timeframeToJapanese } from 'utils'

type ResultQuestions = Record<keyof typeof questions, (Question & { answer: number[] })[]>

// eslint-disable-next-line react/display-name
const SearchPage: NextPage = memo(() => {
  const [word, setWord] = useState<string>('')
  const [resultQuestions, setResultQuestions] = useState<ResultQuestions | null>()

  const handleSearch = useCallback(({ inputText }: { inputText: string }) => {
    let sumCount = 0
    const results: ResultQuestions = {
      '2015am': [],
      '2015pm': [],
      '2016am': [],
      '2016pm': [],
      '2017am': [],
      '2017pm': [],
      '2018am': [],
      '2018pm': [],
      '2019am': [],
      '2019pm': [],
      '2020am': [],
      '2020pm': [],
    }
    for (const UntypedquestionKey in questions) {
      const questionKey = UntypedquestionKey as keyof typeof questions
      const matchQuestions = questions[questionKey].questionData
        .filter((q) => {
          // 大文字小文字を区別しない
          const regex = new RegExp(inputText, 'i')
          // 問題文または質問文にキーワードが入っているか
          return regex.test(q.question) || regex.test(q.options.join(' '))
        })
        .map((q) => ({ ...q, answer: questions[questionKey].answerData[q.num - 1] }))
      console.log(matchQuestions.length)
      sumCount += matchQuestions.length
      console.log(sumCount)
      results[questionKey] = matchQuestions
      if (sumCount > 40) break
    }
    setResultQuestions(results)
    setWord(inputText)
  }, [])

  useEffect(() => {
    if (!word) {
      setResultQuestions(null)
    }
  }, [word])

  return (
    <DefaultLayout title="検索 | 臨検テスト">
      <Container>
        <div className="py-10">
          <PageHeading component="h1">検索</PageHeading>

          <div className="mt-8 sm:mt-12">
            <SearchField onSubmit={handleSearch} />

            {word && resultQuestions && (
              <div className="mt-8 flex flex-col gap-4 sm:mt-12">
                {(
                  [
                    '2015am',
                    '2015pm',
                    '2016am',
                    '2016pm',
                    '2017am',
                    '2017pm',
                    '2018am',
                    '2018pm',
                    '2019am',
                    '2019pm',
                    '2020am',
                    '2020pm',
                  ] as const
                ).reduce((prev, current) => prev + resultQuestions[current].length, 0) > 0 ? (
                  (
                    [
                      '2015am',
                      '2015pm',
                      '2016am',
                      '2016pm',
                      '2017am',
                      '2017pm',
                      '2018am',
                      '2018pm',
                      '2019am',
                      '2019pm',
                      '2020am',
                      '2020pm',
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
                  ))
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
