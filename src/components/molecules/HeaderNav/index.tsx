import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, ReactNode } from 'react'

import { Badge, HeaderNavButton } from 'components/atoms'

type Props = {
  menus: { title: string; url: string; badge?: ReactNode; onClick?: () => void }[]
}

// eslint-disable-next-line react/display-name
export const HeaderNav = memo(({ menus }: Props) => {
  const router = useRouter()

  return (
    <nav>
      <ul>
        {menus.map(({ title, url, badge, onClick }, index) => (
          <li
            key={title}
            className={`${index !== 0 && 'border-t'} select-none border-t-primary-100 dark:border-t-slate-600`}
          >
            {router.pathname === url ? (
              <HeaderNavButton onClick={onClick} pointerEvents={false}>
                {title}
                {badge ? <Badge color="warning">{badge}</Badge> : null}
              </HeaderNavButton>
            ) : (
              <Link href={url}>
                <HeaderNavButton onClick={onClick}>
                  {title}
                  {badge ? <Badge color="warning">{badge}</Badge> : null}
                </HeaderNavButton>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
})
