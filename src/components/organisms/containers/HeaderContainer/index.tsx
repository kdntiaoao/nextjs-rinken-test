import { memo, MouseEvent, useCallback, useMemo, useState } from 'react'

import { useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { useTheme } from 'next-themes'

import { darkModeAtom } from 'atoms/darkModeAtom'
import { incorrectsAtom } from 'atoms/incorrectsAtom'
import { Header } from 'components/organisms/presentations/Header'

const preventPropagation = (event: MouseEvent<HTMLElement>) => event.stopPropagation()

// eslint-disable-next-line react/display-name
export const HeaderContainer = memo(() => {
  const { setTheme } = useTheme()
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const incorrects = useAtomValue(incorrectsAtom)
  const setDarkMode = useUpdateAtom(darkModeAtom)

  const menus = useMemo(
    () => [
      { title: 'ホーム', url: '/' },
      { title: '見直し', url: '/check', badge: incorrects?.length },
      { title: '検索', url: '/search' },
    ],
    [incorrects]
  )

  const changeTheme = useCallback(() => {
    setDarkMode((prev) => {
      setTheme(!prev ? 'dark' : 'light')
      return !prev
    })
  }, [setDarkMode, setTheme])

  const handleToggleMenu = useCallback(() => setOpenMenu((prev) => !prev), [])

  return (
    <Header
      menus={menus}
      openMenu={openMenu}
      changeTheme={changeTheme}
      handleToggleMenu={handleToggleMenu}
      preventPropagation={preventPropagation}
    />
  )
})
