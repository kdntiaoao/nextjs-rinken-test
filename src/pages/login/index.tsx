import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../../../firebase/client'

import { Container, PrimaryButton } from 'components/atoms'
import { LoadingScreen, UserForm } from 'components/molecules'
import { DefaultLayout } from 'components/template/DefaultLayout'

type Inputs = {
  email: string
  password: string
}

// eslint-disable-next-line react/display-name
const LoginPage: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState<{ [K in keyof Inputs]: { message: string } } | null>(null)

  const onSubmit = useCallback(
    async ({ email, password }: Inputs) => {
      setLoading(true)
      try {
        await signInWithEmailAndPassword(auth, email, password)
        await router.push('/')
      } catch (error) {
        setErrors({
          email: { message: '正しい値を入力してください' },
          password: { message: '正しい値を入力してください' },
        })
      } finally {
        setLoading(false)
      }
    },
    [router]
  )

  useEffect(() => {
    if (auth.currentUser) {
      router.push('/')
    }
  }, [router])

  return (
    <DefaultLayout title="ログイン | 臨検テスト">
      <LoadingScreen loading={loading} />
      <Container>
        <div className="py-10">
          <ul className="mx-auto mt-4 flex max-w-3xl overflow-hidden rounded">
            <li className="flex-1 break-keep border-b-2 border-gray-200 dark:border-slate-600">
              <Link href="/register">
                <PrimaryButton shape="square">
                  <span className="text-gray-500 dark:text-slate-400">新規登録</span>
                </PrimaryButton>
              </Link>
            </li>
            <li className="pointer-events-none flex-1 break-keep border-b-2 border-primary-600 font-bold dark:border-primary-500">
              <PrimaryButton shape="square">ログイン</PrimaryButton>
            </li>
          </ul>
          <div className="mt-10 md:mt-16">
            <UserForm errors={errors} isResister={false} onSubmit={onSubmit} />
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default LoginPage
