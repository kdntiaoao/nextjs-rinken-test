import { MouseEvent, useState } from 'react'

import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'

import { Header } from '.'

import { AuthUserType } from 'types/AuthUserType'

describe('Header', () => {
  it('未ログイン', async () => {
    const TestComponent = () => {
      let authUser = null as AuthUserType | null
      const incorrects = [
        {
          year: '2021',
          timeframe: 'am',
          questionNumber: 1,
          selectedAnswer: [2],
        },
      ]
      const [theme, setTheme] = useState<'light' | 'dark'>('light')
      const [openMenu, setOpenMenu] = useState<boolean>(false)

      const handleLogout = jest.fn()

      const changeTheme = () => setTheme((prev: 'light' | 'dark') => (prev === 'light' ? 'dark' : 'light'))

      const handleToggleMenu = () => setOpenMenu((prev) => !prev)

      const preventPropagation = (event: MouseEvent<HTMLElement>) => event.stopPropagation()

      const menus: { title: string; url: string; badge?: number; onClick?: () => void }[] = [
        { title: 'ホーム', url: '/' },
        { title: '見直し', url: '/check', badge: incorrects.length },
        { title: '検索', url: '/search' },
      ]
      if (authUser?.uid) {
        menus.push(
          { title: '履歴', url: '/history' },
          { title: 'ログアウト', url: '/accounts/login', onClick: handleLogout }
        )
      } else {
        menus.push({ title: 'ログイン', url: '/accounts/login' })
      }

      return (
        <Header
          authUser={authUser}
          darkMode={theme === 'dark'}
          menus={menus}
          openMenu={openMenu}
          changeTheme={changeTheme}
          handleToggleMenu={handleToggleMenu}
          preventPropagation={preventPropagation}
        />
      )
    }

    render(<TestComponent />)
    expect(screen.getByText('臨検テスト')).toBeInTheDocument()
    expect(screen.getByText('ログイン')).toBeInTheDocument()
    expect(screen.queryByText('ログアウト')).toBeNull()
  })

  it('ログイン中', async () => {
    const TestComponent = () => {
      let authUser = {
        email: 'tanaka.taro@example.com',
        uid: 'xxxxxxxxxxxx',
      } as AuthUserType | null
      const incorrects = [
        {
          year: '2021',
          timeframe: 'am',
          questionNumber: 1,
          selectedAnswer: [2],
        },
      ]
      const [theme, setTheme] = useState<'light' | 'dark'>('light')
      const [openMenu, setOpenMenu] = useState<boolean>(false)

      const handleLogout = jest.fn()

      const changeTheme = () => setTheme((prev: 'light' | 'dark') => (prev === 'light' ? 'dark' : 'light'))

      const handleToggleMenu = () => setOpenMenu((prev) => !prev)

      const preventPropagation = (event: MouseEvent<HTMLElement>) => event.stopPropagation()

      const menus: { title: string; url: string; badge?: number; onClick?: () => void }[] = [
        { title: 'ホーム', url: '/' },
        { title: '見直し', url: '/check', badge: incorrects.length },
        { title: '検索', url: '/search' },
      ]
      if (authUser?.uid) {
        menus.push(
          { title: '履歴', url: '/history' },
          { title: 'ログアウト', url: '/accounts/login', onClick: handleLogout }
        )
      } else {
        menus.push({ title: 'ログイン', url: '/accounts/login' })
      }

      return (
        <Header
          authUser={authUser}
          darkMode={theme === 'dark'}
          menus={menus}
          openMenu={openMenu}
          changeTheme={changeTheme}
          handleToggleMenu={handleToggleMenu}
          preventPropagation={preventPropagation}
        />
      )
    }

    render(<TestComponent />)
    expect(screen.getByText('ログアウト')).toBeInTheDocument()
    expect(screen.getByLabelText('ユーザー情報ページに遷移する')).toBeInTheDocument()
    expect(screen.queryByText('ログイン')).toBeNull()
  })

  it('見直しの問題があるとき、バッジが表示されるか', async () => {
    const TestComponent = () => {
      let authUser = null as AuthUserType | null
      const incorrects = [
        {
          year: '2021',
          timeframe: 'am',
          questionNumber: 1,
          selectedAnswer: [2],
        },
      ]
      const [theme, setTheme] = useState<'light' | 'dark'>('light')
      const [openMenu, setOpenMenu] = useState<boolean>(false)

      const handleLogout = jest.fn()

      const changeTheme = () => setTheme((prev: 'light' | 'dark') => (prev === 'light' ? 'dark' : 'light'))

      const handleToggleMenu = () => setOpenMenu((prev) => !prev)

      const preventPropagation = (event: MouseEvent<HTMLElement>) => event.stopPropagation()

      const menus: { title: string; url: string; badge?: number; onClick?: () => void }[] = [
        { title: 'ホーム', url: '/' },
        { title: '見直し', url: '/check', badge: incorrects.length },
        { title: '検索', url: '/search' },
      ]
      if (authUser?.uid) {
        menus.push(
          { title: '履歴', url: '/history' },
          { title: 'ログアウト', url: '/accounts/login', onClick: handleLogout }
        )
      } else {
        menus.push({ title: 'ログイン', url: '/accounts/login' })
      }

      return (
        <Header
          authUser={authUser}
          darkMode={theme === 'dark'}
          menus={menus}
          openMenu={openMenu}
          changeTheme={changeTheme}
          handleToggleMenu={handleToggleMenu}
          preventPropagation={preventPropagation}
        />
      )
    }

    render(<TestComponent />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('見直しの問題がないとき、バッジが表示されないか', async () => {
    const TestComponent = () => {
      let authUser = null as AuthUserType | null
      const incorrects = []
      const [theme, setTheme] = useState<'light' | 'dark'>('light')
      const [openMenu, setOpenMenu] = useState<boolean>(false)

      const handleLogout = jest.fn()

      const changeTheme = () => setTheme((prev: 'light' | 'dark') => (prev === 'light' ? 'dark' : 'light'))

      const handleToggleMenu = () => setOpenMenu((prev) => !prev)

      const preventPropagation = (event: MouseEvent<HTMLElement>) => event.stopPropagation()

      const menus: { title: string; url: string; badge?: number; onClick?: () => void }[] = [
        { title: 'ホーム', url: '/' },
        { title: '見直し', url: '/check', badge: incorrects.length },
        { title: '検索', url: '/search' },
      ]
      if (authUser?.uid) {
        menus.push(
          { title: '履歴', url: '/history' },
          { title: 'ログアウト', url: '/accounts/login', onClick: handleLogout }
        )
      } else {
        menus.push({ title: 'ログイン', url: '/accounts/login' })
      }

      return (
        <Header
          authUser={authUser}
          darkMode={theme === 'dark'}
          menus={menus}
          openMenu={openMenu}
          changeTheme={changeTheme}
          handleToggleMenu={handleToggleMenu}
          preventPropagation={preventPropagation}
        />
      )
    }

    render(<TestComponent />)
    expect(screen.queryByRole('status')).toBeNull()
  })
})
