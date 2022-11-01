import { memo } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { SmallHeading } from 'components/atoms'

type Props = {
  answer: number[]
  open: boolean
  options: string[]
  question: string
  questionNumber: number
  selectedAnswer: number[]
  onToggle: () => void
}

// eslint-disable-next-line react/display-name
export const QuestionAccordion = memo(
  ({ answer, open, options, question, questionNumber, selectedAnswer, onToggle }: Props) => {
    return (
      <div className="border border-primary-400 text-primary-900 rounded">
        <div className="px-3 pt-4 min-h-[50px]">
          <SmallHeading>問題{questionNumber}</SmallHeading>
          <div className="mt-4">
            <p>{question}</p>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
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
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              {options.map((option, index) => (
                <div
                  key={option}
                  className={`flex items-center gap-2 px-3 py-2 min-h-[50px] ${
                    answer.indexOf(index + 1) >= 0 && 'bg-red-400/20'
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

        <button className="flex items-center justify-center w-full py-4" onClick={onToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 transition ${open && 'rotate-180'}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>
    )
  }
)
