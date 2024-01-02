import type { UrlObject } from 'url'
import Link from 'next/link'

import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../../../tailwind.config'

const fullConfig = resolveConfig(tailwindConfig)
const colors = fullConfig.theme.colors

type Props = {
  selected?: boolean
  completed?: boolean
  href: string | UrlObject
}

export const QuestionNavItem = ({ selected, completed, href }: Props) => {
  const background = selected ? colors.primary[400] : completed ? colors.primary[600] : colors.gray[600]

  return (
    <li>
      <Link href={href} className="block py-2">
        <span className={`block h-1 w-12 rounded-full`} style={{ background }} />
      </Link>
    </li>
  )
}
