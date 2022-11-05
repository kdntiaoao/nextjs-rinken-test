import { memo, MouseEvent, MouseEventHandler, useCallback, useState } from 'react'

import { Header } from 'components/organisms/presentations/Header'

const preventPropagation = (event: MouseEvent<HTMLElement>) => event.stopPropagation()

const menus = [
  { title: 'ホーム', url: '/' },
  { title: '見直し', url: '/check' },
  { title: '検索', url: '/search' },
]

// eslint-disable-next-line react/display-name
export const HeaderContainer = memo(() => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)

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
