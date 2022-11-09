import Image from 'next/image'
import { memo, MouseEvent, ReactNode } from 'react'

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
    event: MouseEvent<HTMLButtonElement>,
    year: string,
    timeframe: 'am' | 'pm',
    questionNumber: number
  ) => void
}

const magnifyingGlassPlus = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
    />
  </svg>
)

const trash = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
)

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
      <div className="text-primary-900 rounded" onClick={openAccordion ? undefined : handleOpenAccordion}>
        <div className="px-3 py-4 min-h-[48px] bg-amber-50/60">
          <SmallHeading>
            {handleDeleteQuestion && `第${Number(year) - 1953}回${timeframeToJapanese(timeframe)} `}問題{questionNumber}
          </SmallHeading>
          <div className="mt-4">
            <div className="flex gap-2 justify-between items-start">
              <p className={`flex-1 ${openAccordion ? '' : 'truncate'}`}>{question.question}</p>
              {handleDeleteQuestion && (
                <button
                  className="p-1 rounded-full hover:bg-primary-400/10 active:bg-primary-400/20 select-none"
                  onClick={(event) => handleDeleteQuestion(event, year, timeframe, questionNumber)}
                >
                  {trash}
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
                    className="block mt-6 mx-auto w-fit relative text-black/40 hover:text-black cursor-zoom-in"
                    aria-label="画像を拡大する"
                  >
                    <Image
                      priority
                      width={200}
                      height={200}
                      src={`/images/${year}${timeframe}/${question.img}.jpg`}
                      alt={`問題${questionNumber}の画像`}
                    />
                    <span className="absolute bottom-4 right-4">{magnifyingGlassPlus}</span>
                  </button>
                </div>
              )}
              {question.options.map((option, index) => (
                <div
                  key={index.toString()}
                  className={`flex items-center gap-2 px-3 py-2 min-h-[50px] ${
                    answer.indexOf(index) >= 0 && 'bg-red-400/20'
                  }`}
                >
                  <input
                    checked={selectedAnswer.indexOf(index) >= 0}
                    name="selected-answer"
                    type="checkbox"
                    readOnly
                    value={index}
                    className="accent-primary-500 pointer-events-none"
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
          className="flex items-center justify-center w-full py-2 bg-amber-50/60"
          onClick={openAccordion ? handleCloseAccordion : handleOpenAccordion}
          aria-label={openAccordion ? 'アコーディオンを閉じる' : 'アコーディオンを開く'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 transition duration-300 delay-300 ${openAccordion && '-rotate-180'}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>
    )
  }
)
