import Link from 'next/link'
import { memo, MouseEvent, ReactNode } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { Badge } from 'components/atoms'

type Props = {
  darkMode: boolean
  menus: { title: string; url: string; badge?: ReactNode }[]
  openMenu: boolean
  changeTheme: () => void
  handleToggleMenu: () => void
  // eslint-disable-next-line no-unused-vars
  preventPropagation: (event: MouseEvent<HTMLElement>) => void
}

const bars3 = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
    <path
      fillRule="evenodd"
      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
      clipRule="evenodd"
    />
  </svg>
)

const sun = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
    />
  </svg>
)

const moon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
    />
  </svg>
)

const xMark = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
)

const chevronRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
)

// eslint-disable-next-line react/display-name
export const Header = memo(
  ({ darkMode, menus, openMenu, changeTheme, handleToggleMenu, preventPropagation }: Props) => {
    return (
      <header className="border-b border-primary-100 py-4 dark:border-slate-600">
        <div className="flex items-center justify-between px-4">
          <div>
            <Link href="/">
              <span className="flex min-h-[48px] items-center text-xl font-bold">臨検テスト</span>
            </Link>
          </div>

          <button
            type="button"
            className="flex h-12 w-12 select-none items-center justify-center rounded-full hover:bg-primary-400/10 active:bg-primary-400/20 dark:hover:bg-slate-400/10 dark:active:bg-slate-400/20"
            onClick={handleToggleMenu}
            aria-label="メニューを開く"
          >
            {bars3}
          </button>

          <AnimatePresence>
            {openMenu && (
              <div className="fixed top-0 bottom-0 right-0 left-0 z-10 bg-black/40" onClick={handleToggleMenu}>
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
                  <div className="flex items-center justify-between p-4">
                    <button
                      className="flex h-12 w-20 items-center rounded-full bg-yellow-200 p-2 transition-all duration-300 dark:bg-violet-400"
                      onClick={changeTheme}
                      aria-label={darkMode ? 'ライトモードに変更する' : 'ダークモードに変更する'}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white transition-all duration-300 dark:translate-x-8 dark:bg-violet-600">
                        {darkMode ? moon : sun}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="flex h-12 w-12 select-none items-center justify-center rounded-full hover:bg-primary-400/10 active:bg-primary-400/20 dark:hover:bg-slate-400/10 dark:active:bg-slate-400/20"
                      onClick={handleToggleMenu}
                      aria-label="メニューを閉じる"
                    >
                      {xMark}
                    </button>
                  </div>
                  <nav>
                    <ul>
                      {menus.map(({ title, url, badge }, index) => (
                        <li
                          key={title}
                          className={`${
                            index !== 0 && 'border-t'
                          } select-none border-t-primary-100 dark:border-t-slate-600`}
                        >
                          <Link href={url} legacyBehavior>
                            <a
                              className="flex items-center gap-4 p-4 hover:bg-primary-400/10 active:bg-primary-400/20 dark:hover:bg-slate-400/10 dark:active:bg-slate-400/20"
                              onClick={handleToggleMenu}
                            >
                              <span className="flex flex-1 items-center gap-2">
                                {title}
                                {badge ? <Badge color="secondary">{badge}</Badge> : null}
                              </span>
                              {chevronRight}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </motion.dialog>
              </div>
            )}
          </AnimatePresence>
        </div>
      </header>
    )
  }
)
