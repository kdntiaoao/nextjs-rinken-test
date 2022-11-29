import Link from 'next/link'
import { memo, MouseEvent, ReactNode } from 'react'

import { Bars3Icon, ChevronRightIcon, MoonIcon, SunIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'

import { Badge } from 'components/atoms'

type Props = {
  darkMode: boolean
  menus: { title: string; url: string; badge?: ReactNode, onClick?: () => void }[]
  openMenu: boolean
  changeTheme: () => void
  handleToggleMenu: () => void
  // eslint-disable-next-line no-unused-vars
  preventPropagation: (event: MouseEvent<HTMLElement>) => void
}

// eslint-disable-next-line react/display-name
export const Header = memo(
  ({ darkMode, menus, openMenu, changeTheme, handleToggleMenu, preventPropagation }: Props) => {
    return (
      <header className="">
        <div className="z-10 flex h-20 items-center justify-between border-b border-primary-100 bg-white px-4 dark:border-slate-600 dark:bg-slate-800 xl:fixed xl:top-0 xl:left-0 xl:right-0">
          <Link href="/">
            <span className="flex min-h-[48px] items-center text-xl font-bold">臨検テスト</span>
          </Link>

          <button
            className="hidden rounded-full p-3 active:bg-primary-400/20 dark:active:bg-slate-400/20 md:hover:bg-primary-400/10 md:dark:hover:bg-slate-400/10 xl:flex xl:items-center xl:justify-center"
            onClick={changeTheme}
            aria-label={darkMode ? 'ライトモードに変更する' : 'ダークモードに変更する'}
          >
            {darkMode ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
          </button>

          <button
            type="button"
            className="flex h-12 w-12 select-none items-center justify-center rounded-full md:hover:bg-primary-400/10 active:bg-primary-400/20 md:dark:hover:bg-slate-400/10 dark:active:bg-slate-400/20 xl:hidden"
            onClick={handleToggleMenu}
            aria-label="メニューを開く"
          >
            {<Bars3Icon className="h-7 w-7" />}
          </button>

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
                    <button
                      className="flex h-12 w-20 items-center rounded-full bg-yellow-200 p-2 transition-all duration-300 dark:bg-violet-400"
                      onClick={changeTheme}
                      aria-label={darkMode ? 'ライトモードに変更する' : 'ダークモードに変更する'}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white transition-all duration-300 dark:translate-x-8 dark:bg-violet-600">
                        {darkMode ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="flex h-12 w-12 select-none items-center justify-center rounded-full md:hover:bg-primary-400/10 active:bg-primary-400/20 md:dark:hover:bg-slate-400/10 dark:active:bg-slate-400/20"
                      onClick={handleToggleMenu}
                      aria-label="メニューを閉じる"
                    >
                      {<XMarkIcon className="h-7 w-7" />}
                    </button>
                  </div>
                  <nav>
                    <ul>
                      {menus.map(({ title, url, badge, onClick }, index) => (
                        <li
                          key={title}
                          className={`${
                            index !== 0 && 'border-t'
                          } select-none border-t-primary-100 dark:border-t-slate-600`}
                        >
                          <Link href={url} legacyBehavior>
                            <a
                              className="flex items-center gap-4 p-4 md:hover:bg-primary-400/10 active:bg-primary-400/20 md:dark:hover:bg-slate-400/10 dark:active:bg-slate-400/20"
                              onClick={onClick || handleToggleMenu}
                            >
                              <span className="flex flex-1 items-center gap-2">
                                {title}
                                {badge ? <Badge color="secondary">{badge}</Badge> : null}
                              </span>
                              {<ChevronRightIcon className="h-6 w-6" />}
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

          <div className="fixed left-0 top-20 bottom-0 z-10 hidden w-80 border-r border-primary-100 bg-white dark:border-slate-600 dark:bg-slate-800 xl:block">
            <nav>
              <ul>
                {menus.map(({ title, url, badge, onClick }, index) => (
                  <li
                    key={title}
                    className={`${index !== 0 && 'border-t'} select-none border-t-primary-100 dark:border-t-slate-600`}
                  >
                    <Link href={url} legacyBehavior>
                      <a className="flex items-center gap-4 p-4 md:hover:bg-primary-400/10 active:bg-primary-400/20 md:dark:hover:bg-slate-400/10 dark:active:bg-slate-400/20" onClick={onClick}>
                        <span className="flex flex-1 items-center gap-2">
                          {title}
                          {badge ? <Badge color="secondary">{badge}</Badge> : null}
                        </span>
                        {<ChevronRightIcon className="h-6 w-6" />}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    )
  }
)
