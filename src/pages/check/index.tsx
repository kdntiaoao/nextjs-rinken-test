import { NextPage } from 'next'
import { memo, MouseEvent, useCallback } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { useAtom } from 'jotai'

import { questions } from 'assets/questions'
import { incorrectsAtom } from 'atoms/incorrectsAtom'
import { Container, PageHeading } from 'components/atoms'
import { LoadingScreen } from 'components/molecules'
import { QuestionAccordionContainer } from 'components/organisms'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { useHasMounted } from 'hooks'

// eslint-disable-next-line react/display-name
const CheckPage: NextPage = memo(() => {
  const hasMounted = useHasMounted()
  const [incorrects, setIncorrects] = useAtom(incorrectsAtom)

  const handleDeleteQuestion = useCallback(
    (event: MouseEvent, year: string, timeframe: 'am' | 'pm', questionNumber: number) => {
      event.stopPropagation()
      setIncorrects(
        (prev) =>
          prev &&
          prev.filter(
            (incorrect) =>
              !(
                incorrect.year === year &&
                incorrect.timeframe === timeframe &&
                incorrect.questionNumber === questionNumber
              )
          )
      )
    },
    [setIncorrects]
  )
  console.log(incorrects)

  if (!hasMounted) {
    return <LoadingScreen />
  }

  return (
    <DefaultLayout title="見直し | 臨検テスト">
      <Container>
        <div className="py-10">
          <PageHeading component="h1">見直し</PageHeading>

          <div className="mt-12">
            {incorrects && incorrects.length > 0 ? (
              <div className="border border-primary-400 rounded overflow-hidden">
                <AnimatePresence>
                  {incorrects &&
                    [...incorrects].reverse().map(({ year, timeframe, questionNumber, selectedAnswer }, index) => (
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
              </div>
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
