import { doc, getDoc } from 'firebase/firestore'
import useSWR from 'swr'

import { db } from '../../firebase/client'

const fetchHistory = async (uid: string | undefined) => {
  if (!uid) {
    return
  }

  const docSnap = await getDoc(doc(db, 'history', uid))
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    return {}
  }
}

export const useHistory = (uid: string | undefined) => {
  const { data, error } = useSWR(uid, fetchHistory)
  return { history: data, loading: !error && !data, error }
}
