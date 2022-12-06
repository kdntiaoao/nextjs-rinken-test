import Link from 'next/link'
import { memo } from 'react'

import { UserCircleIcon } from '@heroicons/react/24/outline'

// eslint-disable-next-line react/display-name
export const HeaderUserButton = memo(() => {
  return (
    <Link href="/user" legacyBehavior>
      <a
        className="flex h-12 w-12 select-none items-center justify-center rounded-full active:bg-primary-400/20 dark:active:bg-slate-400/20 md:hover:bg-primary-400/10 md:dark:hover:bg-slate-400/10"
        aria-label="ユーザー情報ページに遷移する"
      >
        {<UserCircleIcon className="h-7 w-7" />}
      </a>
    </Link>
  )
})
