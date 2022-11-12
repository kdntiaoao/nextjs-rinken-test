import { memo, MouseEvent, useCallback, useMemo, useState } from 'react'

import { useAtom, useAtomValue } from 'jotai'
import { useTheme } from 'next-themes'

import { darkModeAtom } from 'atoms/darkModeAtom'
import { incorrectsAtom } from 'atoms/incorrectsAtom'
import { Header } from 'components/organisms/presentations/Header'

const preventPropagation = (event: MouseEvent<HTMLElement>) => event.stopPropagation()

// eslint-disable-next-line react/display-name
export const HeaderContainer = memo(() => {
  const { theme, setTheme } = useTheme()
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const incorrects = useAtomValue(incorrectsAtom)
  const [darkMode, setDarkMode] = useAtom(darkModeAtom)

  const menus = useMemo(
    () => [
      { title: 'ホーム', url: '/' },
      { title: '見直し', url: '/check', badge: incorrects?.length },
      { title: '検索', url: '/search' },
    ],
    [incorrects]
  )

  const changeTheme = useCallback(() => {
    console.log('click')
    setDarkMode((prev) => {
      setTheme(!prev ? 'dark' : 'light')
      return !prev
    })
  }, [setDarkMode, setTheme])

  const handleToggleMenu = useCallback(() => setOpenMenu((prev) => !prev), [])

  console.log(theme)

  return (
    <Header
      darkMode={darkMode}
      menus={menus}
      openMenu={openMenu}
      changeTheme={changeTheme}
      handleToggleMenu={handleToggleMenu}
      preventPropagation={preventPropagation}
    />
  )
})
