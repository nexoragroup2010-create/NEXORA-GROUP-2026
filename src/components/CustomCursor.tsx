import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/** Cursor customizado: ponto + anel azul com glow (apenas desktop). */
export default function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 })
  const [hover, setHover] = useState(false)
  const [down, setDown] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    document.documentElement.classList.add('has-custom-cursor')
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)
      const t = e.target as HTMLElement | null
      setHover(!!t?.closest('a, button, input, textarea, select, label, [data-cursor="hover"]'))
    }
    const leave = () => setHidden(true)
    const pd = () => setDown(true)
    const pu = () => setDown(false)
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', pd)
    window.addEventListener('pointerup', pu)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', pd)
      window.removeEventListener('pointerup', pu)
    }
  }, [x, y])

  return (
    <div aria-hidden className={`pointer-events-none fixed inset-0 z-[200] transition-opacity ${hidden ? 'opacity-0' : 'opacity-100'}`}>
      <motion.div
        style={{ x: rx, y: ry }}
        animate={{ scale: down ? 0.7 : hover ? 1.8 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute -left-5 -top-5 h-10 w-10 rounded-full border border-nx-glow shadow-glow"
      >
        <div className={`h-full w-full rounded-full transition-colors ${hover ? 'bg-nx-glow/15' : ''}`} />
      </motion.div>
      <motion.div style={{ x, y }} className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-nx-white shadow-glow" />
    </div>
  )
}
