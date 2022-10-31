import { memo, ReactNode } from 'react'

import { Container } from 'components/atoms'

type Props = {
  onClose: () => void
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const ImageDialog = memo(({ onClose, children }: Props) => {
  return (
    <div className="py-20 fixed inset-0 z-10 bg-black/40" onClick={onClose}>
      <Container className="h-full ">
        <div className="relative h-full">{children}</div>
      </Container>
    </div>
  )
})
