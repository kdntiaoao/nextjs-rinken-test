import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useCallback, useState } from 'react'

import { createUserWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../../../firebase/client'

import { Container, PrimaryButton } from 'components/atoms'
import { LoadingScreen, UserForm } from 'components/molecules'
import { DefaultLayout } from 'components/template/DefaultLayout'

type Inputs = {
  email: string
  password: string
}

// eslint-disable-next-line react/display-name
const RegisterPage: NextPage = memo(() => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState<{ [K in keyof Inputs]: { message: string } } | null>(null)

  const onSubmit = useCallback(async ({ email, password }: Inputs) => {
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log(user)
      await router.push('/')
    } catch (error) {
      setErrors({
        email: { message: '正しい値を入力してください' },
        password: { message: '正しい値を入力してください' },
      })
    } finally {
      setLoading(false)
    }
  }, [router])

  return (
    <DefaultLayout title="臨検テスト">
      <LoadingScreen loading={loading} />
      <Container>
        <div className="py-10">
          <ul className="mx-auto mt-4 flex max-w-3xl overflow-hidden rounded">
            <li className="pointer-events-none flex-1 break-keep border-b-2 border-primary-600">
              <PrimaryButton shape="square">新規登録</PrimaryButton>
            </li>
            <li className="flex-1 break-keep border-b-2 border-gray-200">
              <Link href="/login">
                <PrimaryButton shape="square">ログイン</PrimaryButton>
              </Link>
            </li>
          </ul>
          <div className="mt-10 md:mt-16">
            <UserForm errors={errors} isResister onSubmit={onSubmit} />
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
})

export default RegisterPage
