import { memo, MouseEvent, ReactNode } from 'react'

import { TrashIcon } from '@heroicons/react/24/outline'

import { SmallHeading } from 'components/atoms'
import { timeframeToJapanese } from 'utils'

type Props = {
  openAccordion: boolean
  question: ReactNode
  questionNumber: number
  timeframe: 'am' | 'pm'
  year: string
  onClick: () => void
  onDelete?: (
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
export const QuestionAccordionHeading = memo(
  ({ openAccordion, question, questionNumber, timeframe, year, onClick, onDelete }: Props) => {
    return (
      <div className="min-h-[48px] px-3 py-4" onClick={onClick}>
        <SmallHeading>
          {/* 見直しページでは SmallHeading に「第*回**」を記載 */}
          {onDelete && `第${Number(year) - 1953}回${timeframeToJapanese(timeframe)} `}問題{questionNumber}
        </SmallHeading>
        <div className="mt-4">
          <div className="flex items-start justify-between gap-2">
            <p className={`flex-1 ${openAccordion ? '' : 'truncate'}`}>{question}</p>
            {onDelete && (
              <button
                className="select-none rounded-full p-1 active:bg-primary-400/20 md:hover:bg-primary-400/10"
                onClick={(event) => onDelete(event, year, timeframe, questionNumber)}
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
    )
  }
)
