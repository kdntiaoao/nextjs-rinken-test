import { atom } from 'jotai'

type AnsweredQuestion = {
  num: number
  isCorrect: boolean
}

export const selectedOptionListAtom = atom<string[]>([])

export const answeredQuestionListAtom = atom<AnsweredQuestion[]>([])
