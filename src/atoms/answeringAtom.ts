import { atom } from 'jotai'

import { AnsweringType } from 'types/AnsweringType'

export const answeringAtom = atom<AnsweringType | null>(null)
