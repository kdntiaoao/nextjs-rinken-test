import { useRouter } from 'next/router'
import { memo, MouseEvent, useCallback, useMemo, useState } from 'react'

import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { signOut } from 'firebase/auth'
import { useAtom, useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { useTheme } from 'next-themes'

import { auth } from '../../../../../firebase/client'

import { authUserAtom } from 'atoms/authUserAtom'
import { darkModeAtom } from 'atoms/darkModeAtom'
import { incorrectsAtom } from 'atoms/incorrectsAtom'
import { PrimaryButton } from 'components/atoms'
import { AlertDialog } from 'components/molecules'
import { Header } from 'components/organisms/presentations/Header'

const preventPropagation = (event: MouseEvent<HTMLElement>) => event.stopPropagation()

// eslint-disable-next-line react/display-name
export const HeaderContainer = memo(() => {
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [openLogoutDialog, setOpenLogoutDialog] = useState<boolean>(false)
  const [authUser, setAuthUser] = useAtom(authUserAtom)
  const incorrects = useAtomValue(incorrectsAtom)
  const setDarkMode = useUpdateAtom(darkModeAtom)

  const handleToggleLogoutDialog = useCallback(() => {
    setOpenLogoutDialog((prev) => !prev)
  }, [])

  const handleLogout = useCallback(async () => {
    await signOut(auth)
    setAuthUser(null)
    router.push('accounts//login')
  }, [router, setAuthUser])

  const changeTheme = useCallback(() => {
    setDarkMode(resolvedTheme !== 'dark')
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setDarkMode, setTheme])

  const handleToggleMenu = useCallback(() => setOpenMenu((prev) => !prev), [])

  const menus = useMemo(() => {
    const array: { title: string; url?: string; badge?: number; isLink?: boolean; onClick?: () => void }[] = [
      { title: 'ホーム', url: '/' },
      { title: '見直し', url: '/check', badge: incorrects?.length },
      { title: '検索', url: '/search' },
    ]
    if (authUser?.uid) {
      array.push(
        { title: '履歴', url: '/history' },
        { title: 'ログアウト', isLink: false, onClick: handleToggleLogoutDialog }
      )
    } else {
      array.push({ title: 'ログイン', url: '/accounts/login' })
    }
    return array
  }, [authUser?.uid, handleToggleLogoutDialog, incorrects?.length])

  return (
    <>
      <Header
        authUser={authUser}
        darkMode={resolvedTheme === 'dark'}
        menus={menus}
        openMenu={openMenu}
        changeTheme={changeTheme}
        handleToggleMenu={handleToggleMenu}
        preventPropagation={preventPropagation}
      />

      <AlertDialog
        actions={
          <div className="flex items-center justify-end gap-2">
            <div className="w-fit">
              <PrimaryButton type="button" onClick={handleToggleLogoutDialog}>
                キャンセル
              </PrimaryButton>
            </div>
            <div className="w-fit">
              <PrimaryButton color="error" type="button" variant="contained" onClick={handleLogout}>
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                ログアウト
              </PrimaryButton>
            </div>
          </div>
        }
        open={openLogoutDialog}
        text="ログアウトしますか？"
        handleClose={handleToggleLogoutDialog}
      />
    </>
  )
})
