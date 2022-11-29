import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Provider, useAtomValue } from 'jotai'
import { ThemeProvider } from 'next-themes'
import '../styles/globals.css'

import { darkModeAtom } from 'atoms/darkModeAtom'
import { LoadingScreen } from 'components/molecules'
import { useHasMounted } from 'hooks'

const App = ({ Component, pageProps }: AppProps) => {
  const hasMounted = useHasMounted()
  const darkMode = useAtomValue(darkModeAtom)
  const router = useRouter()
  const [pageLoading, setPageLoading] = useState<boolean>(false)

  const defaultTheme = useMemo(() => {
    if (darkMode === null) {
      return 'system'
    }
    return darkMode ? 'dark' : 'light'
  }, [darkMode])

  const handleStart = useCallback(() => setPageLoading(true), [])
  const handleStop = useCallback(() => setPageLoading(false), [])

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [handleStop, handleStart, router.events])

  if (!hasMounted) {
    return <LoadingScreen />
  }

  return (
    <Provider>
      <ThemeProvider attribute="class" defaultTheme={defaultTheme}>
        <Component {...pageProps} />
        {pageLoading && <LoadingScreen />}
      </ThemeProvider>
    </Provider>
  )
}

export default App
