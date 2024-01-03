type Props = {
  children: React.ReactNode
}

export const LinkList = ({ children }: Props) => {
  return <ul className="overflow-hidden rounded border border-primary-400">{children}</ul>
}
