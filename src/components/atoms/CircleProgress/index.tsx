import { memo, ReactNode } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  /**
   * パーセント (0〜1)
   */
  percent?: number
  strokeWidth?: number
  children?: ReactNode
}

// eslint-disable-next-line react/display-name
export const CircleProgress = memo(({ percent = 1, strokeWidth = 1, children }: Props) => {
  return (
    <div className="relative">
      <svg className="h-full w-full" viewBox={`0 0 24 24`}>
        <circle
          className="text-gray-300"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={10}
          cx={12}
          cy={12}
        />
        <AnimatePresence>
          <motion.circle
            key="parsent"
            className="origin-center -rotate-90 text-primary-600"
            initial={{ strokeDasharray: 2 * Math.PI * 10, strokeDashoffset: 2 * Math.PI * 10 }}
            animate={{
              strokeWidth,
              strokeLinecap: 'round',
              strokeDashoffset: 2 * Math.PI * 10 - 2 * Math.PI * 10 * percent,
              stroke: 'currentColor',
              fill: 'transparent',
              r: 10,
              cx: 12,
              cy: 12,
            }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{children}</div>
    </div>
  )
})
