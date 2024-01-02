type Props = {
  children: React.ReactNode
}

export const QuestionNav = ({ children }: Props) => {
  return (
    <nav>
      <ul className="flex flex-wrap gap-2">{children}</ul>
    </nav>
  )
}
