import type { AppProps } from 'next/app'
import { useMemo } from 'react'

import { Provider, useAtomValue } from 'jotai'
import { ThemeProvider } from 'next-themes'
import '../styles/globals.css'

import { darkModeAtom } from 'atoms/darkModeAtom'
import { LoadingScreen } from 'components/molecules'
import { useHasMounted } from 'hooks'

const App = ({ Component, pageProps }: AppProps) => {
  const hasMounted = useHasMounted()
  const darkMode = useAtomValue(darkModeAtom)

  const defaultTheme = useMemo(() => {
    if (darkMode === null) {
      return 'system'
    }
    return darkMode ? 'dark' : 'light'
  }, [darkMode])

  if (!hasMounted) {
    return <LoadingScreen />
  }

  return (
    <Provider>
      <ThemeProvider attribute="class" defaultTheme={defaultTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default App
