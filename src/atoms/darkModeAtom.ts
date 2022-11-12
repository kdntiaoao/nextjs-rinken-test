import { atomWithStorage } from 'jotai/utils'

export const darkModeAtom = atomWithStorage<boolean | null>('darkMode', null)
