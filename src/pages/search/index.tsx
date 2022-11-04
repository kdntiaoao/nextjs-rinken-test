import { NextPage } from 'next'
import { ChangeEvent, Fragment, memo, useCallback, useState } from 'react'

import { questions } from 'assets/questions'
import { Container, MarkerHeading, PageHeading } from 'components/atoms'
import { SearchField } from 'components/molecules'
import { QuestionAccordionContainer } from 'components/organisms'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { getRangeArray } from 'utils/getRange'
import { timeframeToJapanese } from 'utils/timeToJapanese'

type ResultQuestions = Record<
  keyof typeof questions,
  (typeof questions['2015am']['questionData'][0] & { answer: number[] })[]
>

// eslint-disable-next-line react/display-name
const SearchPage: NextPage = memo(() => {
  const [word, setWord] = useState<string>('')
  const [resultQuestions, setResultQuestions] = useState<ResultQuestions>()

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value)
  }, [])

  const handleSearch = useCallback(() => {
    const resultQuestions: ResultQuestions = {
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
        .filter((q) => q.question.indexOf(word) >= 0 || q.options.join(' ').indexOf(word) >= 0)
        .map((q) => ({ ...q, answer: questions[questionKey].answerData[q.num - 1] }))
      resultQuestions[questionKey] = matchQuestions
    }
    setResultQuestions(resultQuestions)
    console.log('result: ', resultQuestions)
  }, [word])

  return (
    <DefaultLayout title="検索 | 臨検テスト">
      <Container>
        <div className="py-10">
          <PageHeading component="h1">検索</PageHeading>

          <div className="mt-12">
            <SearchField word={word} handleChange={handleChange} handleSearch={handleSearch} />

            {resultQuestions && (
              <div className="mt-12 flex flex-col gap-4">
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
                ).map((y) => (
                  <Fragment key={y}>
                    {resultQuestions[y].length !== 0 && (
                      <div className="mt-10">
                        <div className="mb-4">
                          <p className="text-primary-900 text-xl">
                            第{Number(y.slice(0, 4)) - 1953}回 {timeframeToJapanese(y.slice(-2) as 'am' | 'pm')}
                          </p>
                        </div>
                        <div className=" flex flex-col gap-4">
                          {resultQuestions[y].map(({ num, question, img, options, answer }) => {
                            return (
                              <QuestionAccordionContainer
                                key={`${y}-${num}`}
                                answer={answer.map((answer) => answer - 1)}
                                question={{ num, question, img, options }}
                                questionNumber={num}
                                timeframe={y.slice(-2) as 'am' | 'pm'}
                                year={y.slice(0, 4)}
                                selectedAnswer={''}
                              />
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
})

export default SearchPage
