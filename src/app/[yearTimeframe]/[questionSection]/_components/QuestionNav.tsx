type Props = {
  children: React.ReactNode
}

export const QuestionNav = ({ children }: Props) => {
  return (
    <nav>
      <ul
        className="grid place-content-center gap-2"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(44px, 1fr))',
        }}
      >
        {children}
      </ul>
    </nav>
  )
}
