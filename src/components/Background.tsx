import { useEffect, useRef } from 'react'

/** Fundo fixo: grade sutil, brilhos difusos e partículas discretas. */
export default function Background({ mobile }: { mobile: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const count = mobile ? 30 : 70
    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.3 + 0.3,
      vy: -(Math.random() * 0.25 + 0.05),
      vx: (Math.random() - 0.5) * 0.1,
      a: Math.random() * 0.5 + 0.15,
    }))

    let raf = 0
    let lastScroll = window.scrollY
    const loop = () => {
      const sc = window.scrollY
      const dy = (sc - lastScroll) * 0.15
      lastScroll = sc
      ctx.clearRect(0, 0, w, h)
      for (const d of dots) {
        d.x += d.vx
        d.y += d.vy - dy
        if (d.y < -5) d.y = h + 5
        if (d.y > h + 5) d.y = -5
        if (d.x < -5) d.x = w + 5
        if (d.x > w + 5) d.x = -5
        ctx.beginPath()
        ctx.fillStyle = `rgba(59,123,234,${d.a})`
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [mobile])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-nx-black">
      <div className="flat-grid absolute inset-0" />
      <div className="absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-nx-blue/20 blur-[140px]" />
      <div className="absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-nx-glow/10 blur-[140px]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="scan-line absolute inset-x-0 top-0 h-40" />
    </div>
  )
}
