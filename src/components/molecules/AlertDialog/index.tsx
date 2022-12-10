import { memo, ReactNode } from 'react'

type Props = {
  actions: ReactNode
  open: boolean
  text: string
  handleClose: () => void
}

// eslint-disable-next-line react/display-name
export const AlertDialog = memo(({ actions, open, text, handleClose }: Props) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-10 bg-black/40" onClick={handleClose}>
          <dialog
            open={open}
            className="absolute top-1/2 left-1/2 w-11/12 max-w-lg -translate-x-1/2 -translate-y-1/2 rounded bg-white px-5 py-5 dark:bg-slate-800 md:px-12 md:py-10"
            onClick={(ev) => ev.stopPropagation()}
          >
            <p className="text-xl">{text}</p>
            <div className="mt-12 md:mt-20">{actions}</div>
          </dialog>
        </div>
      )}
    </>
  )
})
