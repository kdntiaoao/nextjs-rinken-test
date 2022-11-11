import { memo, MouseEvent, useCallback, useMemo, useState } from 'react'

import { useAtomValue } from 'jotai'

import { incorrectsAtom } from 'atoms/incorrectsAtom'
import { Header } from 'components/organisms/presentations/Header'

const preventPropagation = (event: MouseEvent<HTMLElement>) => event.stopPropagation()

// eslint-disable-next-line react/display-name
export const HeaderContainer = memo(() => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const incorrects = useAtomValue(incorrectsAtom)

  const menus = useMemo(
    () => [
      { title: 'ホーム', url: '/' },
      { title: '見直し', url: '/check', badge: incorrects?.length },
      { title: '検索', url: '/search' },
    ],
    [incorrects]
  )

  const handleToggleMenu = useCallback(() => setOpenMenu((prev) => !prev), [])

  return (
    <Header
      menus={menus}
      openMenu={openMenu}
      handleToggleMenu={handleToggleMenu}
      preventPropagation={preventPropagation}
    />
  )
})
