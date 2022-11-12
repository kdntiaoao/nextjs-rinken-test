import type { AppProps } from 'next/app'

import { Provider, useAtomValue } from 'jotai'
import { ThemeProvider } from 'next-themes'
import '../styles/globals.css'

import { darkModeAtom } from 'atoms/darkModeAtom'
import { LoadingScreen } from 'components/molecules'
import { useHasMounted } from 'hooks'

const App = ({ Component, pageProps }: AppProps) => {
  const hasMounted = useHasMounted()
  const darkMode = useAtomValue(darkModeAtom)

  if (!hasMounted) {
    return <LoadingScreen />
  }

  console.log(darkMode)

  return (
    <Provider>
      <ThemeProvider attribute="class" defaultTheme={'light'}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default App
