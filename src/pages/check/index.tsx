import { NextPage } from 'next'
import { MouseEvent, useCallback, useState } from 'react'

import { TrashIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { useAtom } from 'jotai'

import { questions } from 'assets/questions'
import { incorrectsAtom } from 'atoms/incorrectsAtom'
import { Container, PageHeading, PrimaryButton } from 'components/atoms'
import { AlertDialog, LoadingScreen, QuestionAccordion } from 'components/molecules'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { useHasMounted } from 'hooks'

// eslint-disable-next-line react/display-name
const CheckPage: NextPage = () => {
  const hasMounted = useHasMounted()
  const [incorrects, setIncorrects] = useAtom(incorrectsAtom)
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false)

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

  const handleToggleAlertDialog = useCallback(() => {
    setOpenAlertDialog((prev) => !prev)
  }, [])

  const handleDeleteAll = useCallback(() => {
    setIncorrects([])
  }, [setIncorrects])

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
              <>
                <div className="ml-auto w-fit">
                  <PrimaryButton
                    color="error"
                    size="sm"
                    type="button"
                    variant="outlined"
                    onClick={handleToggleAlertDialog}
                  >
                    <TrashIcon className="h-5 w-5" />
                    全てを削除する
                  </PrimaryButton>
                </div>

                <AlertDialog
                  actions={
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-fit">
                        <PrimaryButton type="button" onClick={handleToggleAlertDialog}>
                          キャンセル
                        </PrimaryButton>
                      </div>
                      <div className="w-fit">
                        <PrimaryButton color="error" type="button" variant="contained" onClick={handleDeleteAll}>
                          <TrashIcon className="h-5 w-5" />
                          削除する
                        </PrimaryButton>
                      </div>
                    </div>
                  }
                  open={openAlertDialog}
                  text="全て削除しますか？"
                  handleClose={handleToggleAlertDialog}
                />

                <div className="mt-4">
                  <div className="overflow-hidden rounded border border-primary-400">
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
                            <QuestionAccordion
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
              </>
            ) : (
              <p>見直す問題はありません。</p>
            )}
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default CheckPage
