import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const offset = (d: Direction) => {
  switch (d) {
    case 'up': return { y: 40 }
    case 'down': return { y: -40 }
    case 'left': return { x: 50 }
    case 'right': return { x: -50 }
    default: return {}
  }
}

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  once = true,
}: {
  children: ReactNode
  delay?: number
  direction?: Direction
  className?: string
  once?: boolean
}) {
  const variants: Variants = {
    hidden: { opacity: 0, filter: 'blur(6px)', ...offset(direction) },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
    },
  }
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
