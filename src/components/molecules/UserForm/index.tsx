import { memo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { PrimaryButton } from 'components/atoms'

type Inputs = {
  email: string
  password: string
}

type Props = {
  // eslint-disable-next-line no-unused-vars
  errors?: { [K in keyof Inputs]: { message: string } } | null
  isResister: boolean
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: Inputs) => void
}

const schema = z.object({
  email: z.string().email({ message: '無効なメールアドレスです' }).min(1, { message: '必須項目です' }),
  password: z.string().min(6, { message: '6文字以上です' }),
})

// eslint-disable-next-line react/display-name
export const UserForm = memo(({ errors: extraErrors, isResister, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) })

  return (
    <form className="mx-auto max-w-3xl" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative pb-6">
        <label htmlFor="email" className="mb-2 inline-block text-lg">
          メールアドレス
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          className="block h-12 w-full rounded border border-primary-600 bg-white px-4 dark:bg-slate-800"
        />
        <p className="absolute bottom-0 text-sm text-red-600">{extraErrors?.email.message || errors.email?.message}</p>
      </div>
      <div className="relative mt-2 pb-6 md:mt-10">
        <label htmlFor="password" className="mb-2 inline-block text-lg">
          パスワード (6文字以上)
        </label>
        <input
          {...register('password')}
          autoComplete="on"
          id="password"
          type="password"
          className="block h-12 w-full rounded border border-primary-600 bg-white px-4 dark:bg-slate-800"
        />
        <p className="absolute bottom-0 text-sm text-red-600">
          {extraErrors?.password.message || errors.password?.message}
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-lg md:mt-16">
        <PrimaryButton type="submit" shape="rounded-full" variant="contained">
          {isResister ? 'サインアップ' : 'サインイン'}
        </PrimaryButton>
      </div>
    </form>
  )
})
