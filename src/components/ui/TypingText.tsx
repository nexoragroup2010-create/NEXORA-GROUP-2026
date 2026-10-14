import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

/** Texto com efeito de digitação, disparado quando entra na tela. */
export default function TypingText({
  text,
  speed = 45,
  startDelay = 0,
  className = '',
}: {
  text: string
  speed?: number
  startDelay?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let i = 0
    let interval: number | undefined
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1
        setCount(i)
        if (i >= text.length) window.clearInterval(interval)
      }, speed)
    }, startDelay)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(interval)
    }
  }, [inView, text, speed, startDelay])

  const done = count >= text.length
  return (
    <span ref={ref} className={`${className} ${done ? '' : 'typing-caret'}`} aria-label={text}>
      <span aria-hidden>{text.slice(0, count)}</span>
      {/* reserva o espaço para evitar "pulos" de layout */}
      <span aria-hidden className="invisible">{text.slice(count)}</span>
    </span>
  )
}
