import { onAuthStateChanged } from 'firebase/auth'
import { atom } from 'jotai'

import { auth } from '../../firebase/client'

import { AuthUserType } from 'types/AuthUserType'

export const authUserAtom = atom<AuthUserType | null>(null)
authUserAtom.onMount = (setAtom) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setAtom({ uid: user.uid })
      console.log('user:', user.uid)
    } else {
      console.log('no user')
    }
  })

  return () => {
    console.log('clean up')
    unsubscribe()
  }
}
