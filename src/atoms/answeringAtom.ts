import { atomWithStorage } from 'jotai/utils'

import { AnsweringType } from 'types/AnsweringType'

export const answeringAtom = atomWithStorage<AnsweringType | null>('answering', null)
