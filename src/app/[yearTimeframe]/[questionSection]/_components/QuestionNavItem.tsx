import type { UrlObject } from 'url'
import Link from 'next/link'

// import resolveConfig from 'tailwindcss/resolveConfig'
// import tailwindConfig from '../../../../../tailwind.config'

// const fullConfig = resolveConfig(tailwindConfig)
// console.log(fullConfig.theme.colors.primary)

type Props = {
  selected?: boolean
  href: string | UrlObject
}

export const QuestionNavItem = ({ selected, href }: Props) => {
  const bg = selected ? 'bg-primary-400' : 'bg-gray-600'

  return (
    <li>
      <Link href={href} className="block py-2">
        <span className={`block h-1 w-12 rounded-full ${bg}`} />
      </Link>
    </li>
  )
}
