import { NextPage } from 'next'
import { memo, MouseEvent, useCallback, useEffect, useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { questions } from 'assets/questions'
import { Container, PageHeading } from 'components/atoms'
import { QuestionAccordionContainer } from 'components/organisms'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { useCheck } from 'hooks'

// eslint-disable-next-line react/display-name
const CheckPage: NextPage = memo(() => {
  const { questionsToCheck, removeQuestion } = useCheck()

  const handleDeleteQuestion = useCallback(
    (event: MouseEvent, year: string, timeframe: 'am' | 'pm', questionNumber: number) => {
      event.stopPropagation()
      removeQuestion(year, timeframe, questionNumber)
    },
    [removeQuestion]
  )

  return (
    <DefaultLayout title="見直し | 臨検テスト">
      <Container>
        <div className="py-10">
          <PageHeading component="h1">見直し</PageHeading>

          <div className="mt-12">
            <AnimatePresence>
              {questionsToCheck &&
                [...questionsToCheck].reverse().map(({ year, timeframe, questionNumber, selectedAnswer }) => (
                  <motion.div
                    key={`${year}-${timeframe}-${questionNumber}`}
                    animate={{ opacity: 1, marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <QuestionAccordionContainer
                      answer={questions[(year + timeframe) as keyof typeof questions].answerData[
                        questionNumber - 1
                      ].map((answer) => answer - 1)}
                      question={
                        questions[(year + timeframe) as keyof typeof questions].questionData[questionNumber - 1]
                      }
                      questionNumber={questionNumber}
                      timeframe={timeframe}
                      year={year}
                      selectedAnswer={selectedAnswer}
                      handleDeleteQuestion={handleDeleteQuestion}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
})

export default CheckPage
