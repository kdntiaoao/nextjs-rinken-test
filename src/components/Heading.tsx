type Props = {
  children: React.ReactNode
  component?: React.ElementType
}

export const Heading = ({ children, component: Component = 'h1' }: Props) => {
  return <Component className="mx-auto block w-fit text-center text-3xl">{children}</Component>
}
