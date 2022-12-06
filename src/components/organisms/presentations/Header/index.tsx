import { memo, MouseEvent, ReactNode } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { HeaderCloseButton, HeaderMenuButton, HeaderTitle, HeaderUserButton } from 'components/atoms'
import { DarkModeButton, HeaderNav } from 'components/molecules'
import { AuthUserType } from 'types/AuthUserType'

type Props = {
  authUser: AuthUserType | null | undefined
  darkMode: boolean
  menus: { title: string; url: string; badge?: ReactNode; onClick?: () => void }[]
  openMenu: boolean
  changeTheme: () => void
  handleToggleMenu: () => void
  // eslint-disable-next-line no-unused-vars
  preventPropagation: (event: MouseEvent<HTMLElement>) => void
}

// eslint-disable-next-line react/display-name
export const Header = memo(
  ({ authUser, darkMode, menus, openMenu, changeTheme, handleToggleMenu, preventPropagation }: Props) => {
    return (
      <header>
        <div className="z-10 flex h-20 items-center justify-between border-b border-primary-100 bg-white px-4 dark:border-slate-600 dark:bg-slate-800 xl:fixed xl:top-0 xl:left-0 xl:right-0">
          <HeaderTitle>臨検テスト</HeaderTitle>

          <div className="flex items-center gap-2">
            <div className="hidden xl:block">
              <DarkModeButton darkMode={darkMode} onClick={changeTheme} />
            </div>
            {authUser && <HeaderUserButton />}
            <HeaderMenuButton onOpen={handleToggleMenu} />
          </div>

          {/* メニュー */}
          <AnimatePresence>
            {openMenu && (
              <div
                className="fixed top-0 bottom-0 right-0 left-0 z-10 bg-black/40 xl:hidden"
                onClick={handleToggleMenu}
              >
                <motion.dialog
                  key="menu"
                  open={openMenu}
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.3 }}
                  className="mr-0 ml-auto h-full w-4/5 max-w-xs cursor-auto bg-white p-0 dark:bg-slate-800 dark:text-white"
                  onClick={preventPropagation}
                >
                  <div className="flex h-20 items-center justify-between px-4">
                    <DarkModeButton darkMode={darkMode} onClick={changeTheme} />
                    <HeaderCloseButton onClose={handleToggleMenu} />
                  </div>
                  <HeaderNav menus={menus} />
                </motion.dialog>
              </div>
            )}
          </AnimatePresence>

          <div className="fixed left-0 top-20 bottom-0 z-10 hidden w-80 border-r border-primary-100 bg-white dark:border-slate-600 dark:bg-slate-800 xl:block">
            <HeaderNav menus={menus} />
          </div>
        </div>
      </header>
    )
  }
)
