import { memo, MouseEvent, ReactNode, useCallback, useMemo, useState } from 'react'

import { signOut } from 'firebase/auth'
import { useAtom, useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { useTheme } from 'next-themes'

import { auth } from '../../../../../firebase/client'

import { authUserAtom } from 'atoms/authUserAtom'
import { darkModeAtom } from 'atoms/darkModeAtom'
import { incorrectsAtom } from 'atoms/incorrectsAtom'
import { Header } from 'components/organisms/presentations/Header'

const preventPropagation = (event: MouseEvent<HTMLElement>) => event.stopPropagation()

// eslint-disable-next-line react/display-name
export const HeaderContainer = memo(() => {
  const { resolvedTheme, setTheme } = useTheme()
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [authUser, setAuthUser] = useAtom(authUserAtom)
  const incorrects = useAtomValue(incorrectsAtom)
  const setDarkMode = useUpdateAtom(darkModeAtom)

  const handleLogout = useCallback(async () => {
    await signOut(auth)
    setAuthUser(null)
  }, [setAuthUser])

  const changeTheme = useCallback(() => {
    setDarkMode(resolvedTheme !== 'dark')
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setDarkMode, setTheme])

  const handleToggleMenu = useCallback(() => setOpenMenu((prev) => !prev), [])

  const menus = useMemo(() => {
    const array: { title: string; url: string; badge?: ReactNode; onClick?: () => void }[] = [
      { title: 'ホーム', url: '/' },
      { title: '見直し', url: '/check', badge: incorrects?.length },
      { title: '検索', url: '/search' },
    ]
    if (authUser?.uid) {
      array.push({ title: '履歴', url: '/history' }, { title: 'ログアウト', url: '/login', onClick: handleLogout })
    } else {
      array.push({ title: 'ログイン', url: '/login' })
    }
    return array
  }, [authUser?.uid, handleLogout, incorrects?.length])

  return (
    <Header
      darkMode={resolvedTheme === 'dark'}
      menus={menus}
      openMenu={openMenu}
      changeTheme={changeTheme}
      handleToggleMenu={handleToggleMenu}
      preventPropagation={preventPropagation}
    />
  )
})
