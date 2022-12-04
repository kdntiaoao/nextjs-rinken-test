import { memo } from 'react'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { SubmitHandler, useForm } from 'react-hook-form'

import { PrimaryButton } from 'components/atoms'

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSubmit: SubmitHandler<{ inputText: string }>
}

// eslint-disable-next-line react/display-name
export const SearchField = memo(({ onSubmit }: Props) => {
  const { register, handleSubmit } = useForm<{ inputText: string }>()

  return (
    <form className="flex flex-wrap justify-center gap-2 sm:gap-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        enterKeyHint="search"
        type="search"
        className="max-w-2xl flex-1 appearance-none rounded-none border-b-2 border-b-primary-600 bg-white px-2 py-2 outline-none dark:bg-slate-800 sm:px-4"
        {...register('inputText')}
      />
      <div>
        <PrimaryButton component="button" shape="rounded-full" type="submit" variant="contained" aria-label="検索">
          {<MagnifyingGlassIcon className="h-5 w-5" />}
          <span className="hidden sm:inline-block">検索</span>
        </PrimaryButton>
      </div>
    </form>
  )
})
