import { memo, ReactNode } from 'react'

type Props = {
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const Heading = memo(({ component, children }: Props) => {
  if (component === 'h1') {
    return <h1 className='text-xl border-b-2 border-primary-400'>{children}</h1>
  } else if (component === 'h2') {
    return <h2 className='text-xl border-b-2 border-primary-400'>{children}</h2>
  } else if (component === 'h3') {
    return <h3 className='text-xl border-b-2 border-primary-400'>{children}</h3>
  } else if (component === 'h4') {
    return <h4 className='text-xl border-b-2 border-primary-400'>{children}</h4>
  } else if (component === 'h5') {
    return <h5 className='text-xl border-b-2 border-primary-400'>{children}</h5>
  } else if (component === 'h6') {
    return <h6 className='text-xl border-b-2 border-primary-400'>{children}</h6>
  } else {
    return <p className='text-xl border-b-2 border-primary-400'>{children}</p>
  }
})
