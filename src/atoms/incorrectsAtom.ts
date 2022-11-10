import { atomWithStorage } from 'jotai/utils'

import { IncorrectsType } from 'types/IncorrectType'

export const incorrectsAtom = atomWithStorage<IncorrectsType | null>('incorrect', null)
