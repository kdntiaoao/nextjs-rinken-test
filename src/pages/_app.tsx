import type { AppProps } from 'next/app'

import '../styles/globals.css'
import { Provider } from 'jotai'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
