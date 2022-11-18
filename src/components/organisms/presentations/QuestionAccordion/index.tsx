import Image from 'next/image'
import { memo, MouseEvent, ReactNode } from 'react'

import { ChevronDownIcon, MagnifyingGlassPlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'

import { SmallHeading } from 'components/atoms'
import { ImageDialog } from 'components/molecules'
import { Question } from 'types/question'
import { Overwrite } from 'types/utils'
import { timeframeToJapanese } from 'utils'

type Props = {
  answer: number[]
  openAccordion: boolean
  openDialog: boolean
  question: Overwrite<Question, { question: ReactNode; options: ReactNode[] }>
  questionNumber: number
  selectedAnswer: number[]
  timeframe: 'am' | 'pm'
  year: string
  handleOpenAccordion: () => void
  handleCloseAccordion: () => void
  handleOpenDialog: () => void
  handleCloseDialog: () => void
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
  ({
    answer,
    openAccordion,
    openDialog,
    question,
    questionNumber,
    selectedAnswer,
    timeframe,
    year,
    handleOpenAccordion,
    handleCloseAccordion,
    handleOpenDialog,
    handleCloseDialog,
    handleDeleteQuestion,
  }: Props) => {
    return (
      <div
        id={`accordion_${year}_${timeframe}_${questionNumber}`}
        className="rounded bg-amber-50/30 dark:bg-slate-700/30"
      >
        <div className="min-h-[48px] px-3 py-4" onClick={openAccordion ? handleCloseAccordion : handleOpenAccordion}>
          <SmallHeading>
            {handleDeleteQuestion && `第${Number(year) - 1953}回${timeframeToJapanese(timeframe)} `}問題{questionNumber}
          </SmallHeading>
          <div className="mt-4">
            <div className="flex items-start justify-between gap-2">
              <p className={`flex-1 ${openAccordion ? '' : 'truncate'}`}>{question.question}</p>
              {handleDeleteQuestion && (
                <button
                  className="select-none rounded-full p-1 md:hover:bg-primary-400/10 active:bg-primary-400/20"
                  onClick={(event) => handleDeleteQuestion(event, year, timeframe, questionNumber)}
                  aria-label={`第${Number(year) - 1953}回${timeframeToJapanese(
                    timeframe
                  )}問題${questionNumber}を削除する`}
                >
                  {<TrashIcon className="h-6 w-6" />}
                </button>
              )}
            </div>
          </div>
        </div>

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
                    className="relative mx-auto mt-6 block w-fit cursor-zoom-in text-black/40 md:hover:text-black"
                    aria-label="画像を拡大する"
                  >
                    <Image
                      priority
                      width={200}
                      height={200}
                      src={`/images/${year}${timeframe}/${question.img}.jpg`}
                      alt={`問題${questionNumber}の画像`}
                      className="w-auto"
                    />
                    <span className="absolute bottom-4 right-4">{<MagnifyingGlassPlusIcon className="h-6 w-6" />}</span>
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
