type Props = {
  children: React.ReactNode
}

export const OptionList = ({ children }: Props) => {
  return <div className="grid overflow-hidden rounded border border-primary-400">{children}</div>
}
