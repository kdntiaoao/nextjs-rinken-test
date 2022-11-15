import { memo, ReactNode } from 'react'

import { motion, AnimatePresence, Variants } from 'framer-motion'

type Props = {
  animateKey: string | null | undefined
  children: ReactNode
}

// eslint-disable-next-line react/display-name
export const AnimateQuestion = memo(({ animateKey, children }: Props) => {
  const variants: Variants = {
    fade: {
      opacity: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      pointerEvents: 'none',
    },
    show: { opacity: 1, x: 0, position: 'relative', transitionEnd: { pointerEvents: 'auto' } },
    right: {
      x: '-100vw',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      pointerEvents: 'none',
    },
  }

  return (
    <AnimatePresence>
      <motion.div
        key={animateKey}
        initial="fade"
        animate="show"
        exit="right"
        transition={{ duration: 0.8 }}
        variants={variants}
        className="bg-white dark:bg-slate-800"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
})
