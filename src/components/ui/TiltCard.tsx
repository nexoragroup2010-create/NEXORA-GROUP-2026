import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { ReactNode, PointerEvent } from 'react'

/** Card com efeito tilt 3D e brilho que acompanha o ponteiro. */
export default function TiltCard({
  children,
  className = '',
  max = 12,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rx = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 200, damping: 18 })
  const ry = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 200, damping: 18 })
  const glowX = useTransform(x, (v) => `${v * 100}%`)
  const glowY = useTransform(y, (v) => `${v * 100}%`)
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX} ${glowY}, rgba(59,123,234,0.22), transparent 45%)`

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width)
    y.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className={`group relative h-full ${className}`}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glow }}
        />
        {children}
      </motion.div>
    </div>
  )
}
