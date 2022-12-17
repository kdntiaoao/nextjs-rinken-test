import Image from 'next/image'
import { memo, MouseEvent, ReactNode, useCallback, useState } from 'react'

import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'

import { ImageDialog, QuestionAccordionHeading } from 'components/molecules'
import { Question } from 'types/question'
import { Overwrite } from 'types/utils'

type Props = {
  answer: number[]
  question: Overwrite<Question, { question: ReactNode; options: ReactNode[] }>
  questionNumber: number
  selectedAnswer: number[]
  timeframe: 'am' | 'pm'
  year: string
  handleDeleteQuestion?: (
    // eslint-disable-next-line no-unused-vars
    event: MouseEvent<HTMLButtonElement>,
    // eslint-disable-next-line no-unused-vars
    year: string,
    // eslint-disable-next-line no-unused-vars
    timeframe: 'am' | 'pm',
    // eslint-disable-next-line no-unused-vars
    questionNumber: number
  ) => void
}

// eslint-disable-next-line react/display-name
export const QuestionAccordion = memo(
  ({ answer, question, questionNumber, timeframe, year, selectedAnswer, handleDeleteQuestion }: Props) => {
    const [openAccordion, setOpenAccordion] = useState<boolean>(false)
    const [openDialog, setOpenDialog] = useState<boolean>(false) // 画像ダイアログフラグ

    const handleOpenAccordion = useCallback(() => setOpenAccordion(true), [])

    const handleCloseAccordion = useCallback(() => setOpenAccordion(false), [])

    const handleOpenDialog = useCallback(() => setOpenDialog(true), [])

    const handleCloseDialog = useCallback(() => setOpenDialog(false), [])

    return (
      <div
        id={`accordion_${year}_${timeframe}_${questionNumber}`}
        className="rounded bg-amber-50/30 dark:bg-slate-700/30"
      >
        <QuestionAccordionHeading
          openAccordion={openAccordion}
          question={question.question}
          questionNumber={questionNumber}
          timeframe={timeframe}
          year={year}
          onClick={openAccordion ? handleCloseAccordion : handleOpenAccordion}
          onDelete={handleDeleteQuestion}
        />

        <AnimatePresence initial={false}>
          {openAccordion && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              className="overflow-hidden"
              exit="collapsed"
              variants={{
                open: { height: 'auto' },
                collapsed: { height: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              {question.img && (
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={handleOpenDialog}
                    className="relative mx-auto block w-fit max-w-full cursor-zoom-in"
                    aria-label="画像を拡大する"
                  >
                    <div className="h-52 w-80">
                      <Image
                        priority
                        fill
                        src={`/images/${year}${timeframe}/${question.img}.jpg`}
                        alt={`問題${questionNumber}の画像`}
                        className="object-contain"
                      />
                    </div>
                  </button>
                </div>
              )}
              {question.options.map((option, index) => (
                <div
                  key={index.toString()}
                  className={`flex min-h-[50px] items-center gap-2 px-3 py-2 ${
                    answer.indexOf(index) >= 0 ? 'bg-red-400/20' : 'bg-white dark:bg-slate-800'
                  }`}
                >
                  <input
                    checked={selectedAnswer.indexOf(index) >= 0}
                    name="selected-answer"
                    type="checkbox"
                    readOnly
                    value={index}
                    className="pointer-events-none accent-primary-600"
                  />
                  <p>{option}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {openDialog && (
          <ImageDialog onClose={handleCloseDialog}>
            <Image
              fill
              className="object-contain object-center"
              src={`/images/${year}${timeframe}/${question.img}.jpg`}
              alt={`問題${questionNumber}の画像`}
            />
          </ImageDialog>
        )}

        <button
          className="flex w-full items-center justify-center py-2"
          onClick={openAccordion ? handleCloseAccordion : handleOpenAccordion}
          aria-expanded={openAccordion}
          aria-controls={`accordion_${year}_${timeframe}_${questionNumber}`}
          aria-label={openAccordion ? 'アコーディオンを閉じる' : 'アコーディオンを開く'}
        >
          <ChevronDownIcon className={`h-6 w-6 transition delay-300 duration-300 ${openAccordion && '-rotate-180'}`} />
        </button>
      </div>
    )
  }
)
