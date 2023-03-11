import Link from 'next/link'
import { memo } from 'react'

import { Badge, HeaderNavButton } from 'components/atoms'

type Props = {
  menus: { title: string; url?: string; badge?: number; isLink?: boolean; onClick?: () => void }[]
}

// eslint-disable-next-line react/display-name
export const HeaderNav = memo(({ menus }: Props) => {
  return (
    <nav>
      <ul>
        {menus.map(({ title, url, badge, isLink = true, onClick }, index) => (
          <li
            key={title}
            className={`${index !== 0 && 'border-t'} select-none border-t-primary-100 dark:border-t-slate-600`}
          >
            {isLink && url !== undefined ? (
              <Link href={url}>
                <HeaderNavButton onClick={onClick}>
                  {title}
                  {badge ? (
                    <Badge color="warning" aria-label={`見直しの問題が${badge}問あります。`}>
                      {badge}
                    </Badge>
                  ) : null}
                </HeaderNavButton>
              </Link>
            ) : (
              <HeaderNavButton onClick={onClick}>
                {title}
                {badge ? (
                  <Badge color="warning" aria-label={`見直しの問題が${badge}問あります。`}>
                    {badge}
                  </Badge>
                ) : null}
              </HeaderNavButton>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
})
