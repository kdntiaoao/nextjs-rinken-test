import { atomWithStorage } from 'jotai/utils'

export type AnsweredQuestion = {
  questionID: string
  isCorrect: boolean
}

export const selectedOptionListAtom = atomWithStorage<string[]>('selectedOptionList', [])

export const answeredQuestionListAtom = atomWithStorage<AnsweredQuestion[]>('answeredQuestionList', [])
