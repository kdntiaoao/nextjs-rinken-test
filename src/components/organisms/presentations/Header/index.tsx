import Link from 'next/link'
import { memo, MouseEvent } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  menus: { title: string; url: string }[]
  openMenu: boolean
  handleToggleMenu: () => void
  preventPropagation: (event: MouseEvent<HTMLElement>) => void
}

const bars3 = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path
      fillRule="evenodd"
      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
      clipRule="evenodd"
    />
  </svg>
)

const xMark = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
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
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
)

// eslint-disable-next-line react/display-name
export const Header = memo(({ menus, openMenu, handleToggleMenu, preventPropagation }: Props) => {
  return (
    <header className="py-4 text-primary-900 border-b border-primary-100">
      <div className="px-4 flex items-center justify-between">
        <div>
          <Link href="/">
            <span className="text-xl font-bold flex items-center min-h-[48px]">臨検テスト</span>
          </Link>
        </div>

        <button
          type="button"
          className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-primary-400/10 active:bg-primary-400/20 select-none"
          onClick={handleToggleMenu}
          aria-label="メニューを開く"
        >
          {bars3}
        </button>

        <AnimatePresence>
          {openMenu && (
            <div
              className="fixed top-0 bottom-0 right-0 left-0 z-10 bg-black/40"
              onClick={handleToggleMenu}
            >
              <motion.div
                key="menu"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3 }}
                className="bg-white w-4/5 max-w-xs h-full ml-auto cursor-auto"
                onClick={preventPropagation}
              >
                <div className="p-4">
                  <button
                    type="button"
                    className="w-12 h-12 ml-auto flex items-center justify-center rounded-full hover:bg-primary-400/10 active:bg-primary-400/20 select-none"
                    onClick={handleToggleMenu}
                    aria-label="メニューを閉じる"
                  >
                    {xMark}
                  </button>
                </div>
                <nav>
                  <ul>
                    {menus.map(({ title, url }, index) => (
                      <li key={title} className={`${index !== 0 && 'border-t'} border-t-primary-100 select-none`}>
                        <Link href={url} legacyBehavior>
                          <a className="p-4 flex items-center gap-4 hover:bg-primary-400/10 active:bg-primary-400/20">
                            <span className="flex-1">{title}</span>
                            {chevronRight}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
})
