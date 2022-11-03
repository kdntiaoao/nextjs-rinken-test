import Image from 'next/image'
import { memo } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { SmallHeading } from 'components/atoms'
import { ImageDialog } from 'components/molecules'
import { Question } from 'types/question'

type Props = {
  answer: number[]
  openAccordion: boolean
  openDialog: boolean
  question: Question
  questionNumber: number
  selectedAnswer: number[]
  timeframe: 'am' | 'pm'
  year: string
  onToggle: () => void
  handleOpenDialog: () => void
  handleCloseDialog: () => void
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
    onToggle,
    handleOpenDialog,
    handleCloseDialog,
  }: Props) => {
    return (
      <div className="border border-primary-400 text-primary-900 rounded">
        <div className="px-3 pt-4 min-h-[48px]">
          <SmallHeading>問題{questionNumber}</SmallHeading>
          <div className="mt-4">
            <p>{question.question}</p>
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
                open: { height: 'auto', marginTop: 12 },
                collapsed: { height: 0, marginTop: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              {question.img && (
                <button
                  type="button"
                  onClick={handleOpenDialog}
                  className="block mt-6 mx-auto w-fit relative text-black/40 hover:text-black "
                >
                  <Image
                    priority
                    width={200}
                    height={200}
                    src={`/images/${year}${timeframe}/${question.img}.jpg`}
                    alt={`問題${questionNumber}の画像`}
                    className="w-auto"
                  />
                  <span className="absolute bottom-4 right-4">{magnifyingGlassPlus}</span>
                </button>
              )}
              {question.options.map((option, index) => (
                <div
                  key={option}
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

        <button className="flex items-center justify-center w-full py-4" onClick={onToggle}>
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
