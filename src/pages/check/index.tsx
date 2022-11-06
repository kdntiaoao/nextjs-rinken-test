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

          <div className="mt-12 border border-primary-400 rounded overflow-hidden">
            {questionsToCheck && questionsToCheck.length > 0 ? (
              <AnimatePresence>
                {questionsToCheck &&
                  [...questionsToCheck].reverse().map(({ year, timeframe, questionNumber, selectedAnswer }, index) => (
                    <motion.div
                      key={`${year}-${timeframe}-${questionNumber}`}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`${index !== 0 && 'border-t border-t-primary-400'}`}
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
            ) : (
              <p>見直す問題はありません。</p>
            )}
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
})

export default CheckPage
