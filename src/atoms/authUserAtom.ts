import { onAuthStateChanged } from 'firebase/auth'
import { atom } from 'jotai'

import { auth } from '../../firebase/client'

import { AuthUserType } from 'types/AuthUserType'

export const authUserAtom = atom<AuthUserType | null | undefined>(undefined)
authUserAtom.onMount = (setAtom) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setAtom({ uid: user.uid })
    } else {
      setAtom(null)
    }
  })

  return () => {
    unsubscribe()
  }
}
