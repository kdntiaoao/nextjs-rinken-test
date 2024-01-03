import { ChevronRightIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'

type Props = {
  children: React.ReactNode
  href: string
}

export const LinkListItem = ({ children, href }: Props) => {
  return (
    <li className="break-keep">
      <Link href={href} className="relative grid place-content-center px-3 py-2 hover:bg-primary-400/10">
        {children}
        <ChevronRightIcon className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2" />
      </Link>
    </li>
  )
}
