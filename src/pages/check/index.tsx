import { NextPage } from 'next'
import { memo } from 'react'

import { questions } from 'assets/questions'
import { Container, PageHeading } from 'components/atoms'
import { QuestionAccordionContainer } from 'components/organisms'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { getRangeArray } from 'utils'

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

// eslint-disable-next-line react/display-name
const CheckPage: NextPage = memo(() => {
  return (
    <DefaultLayout title="見直し | 臨検テスト">
      <Container>
        <div className="py-10">
          <PageHeading component="h1">見直し</PageHeading>

          <div className="mt-12 flex flex-col gap-4">
            {getRangeArray(21, 30).map((number) => {
              return (
                <QuestionAccordionContainer
                  key={number}
                  answer={questions['2015am'].answerData[number - 1].map((answer) => answer - 1)}
                  question={questions['2015am'].questionData[number - 1]}
                  questionNumber={number}
                  timeframe={'am'}
                  year={'2015'}
                  selectedAnswer={'1'}
                />
              )
            })}
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
})

export default CheckPage
