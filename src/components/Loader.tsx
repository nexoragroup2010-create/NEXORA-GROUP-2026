import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Particle = { x: number; y: number; tx: number; ty: number; vx: number; vy: number; r: number; a: number }

/** Loader inicial: o logo "NEXORA" se forma a partir de partículas azuis. */
export default function Loader({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)

    // Rasteriza o texto em um canvas auxiliar e coleta os pixels.
    const off = document.createElement('canvas')
    off.width = w
    off.height = h
    const octx = off.getContext('2d', { willReadFrequently: true })!
    const fontSize = Math.min(w / 6.2, 150)
    octx.fillStyle = '#fff'
    octx.textAlign = 'center'
    octx.textBaseline = 'middle'
    octx.font = `900 ${fontSize}px Orbitron, sans-serif`
    octx.fillText('NEXORA', w / 2, h / 2)
    const data = octx.getImageData(0, 0, w, h).data
    const gap = w < 640 ? 4 : 5
    const particles: Particle[] = []
    for (let y = 0; y < h; y += gap) {
      for (let x = 0; x < w; x += gap) {
        if (data[(y * w + x) * 4 + 3] > 128) {
          const ang = Math.random() * Math.PI * 2
          const dist = Math.max(w, h) * (0.5 + Math.random() * 0.6)
          particles.push({
            x: w / 2 + Math.cos(ang) * dist,
            y: h / 2 + Math.sin(ang) * dist,
            tx: x,
            ty: y,
            vx: 0,
            vy: 0,
            r: Math.random() * 1.2 + 0.8,
            a: Math.random() * 0.5 + 0.5,
          })
        }
      }
    }

    let raf = 0
    const start = performance.now()
    const DURATION = 2600
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1)
      setProgress(Math.round(t * 100))
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      for (const p of particles) {
        // mola amortecida até o alvo
        p.vx = (p.vx + (p.tx - p.x) * 0.012) * 0.86
        p.vy = (p.vy + (p.ty - p.y) * 0.012) * 0.86
        p.x += p.vx
        p.y += p.vy
        const jitter = t > 0.85 ? (Math.random() - 0.5) * 0.6 : 0
        ctx.beginPath()
        ctx.fillStyle = Math.random() > 0.92 ? `rgba(245,247,250,${p.a})` : `rgba(59,123,234,${p.a})`
        ctx.arc(p.x + jitter, p.y + jitter, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (t < 1) raf = requestAnimationFrame(tick)
      else {
        // mantém o logo um instante e some
        raf = requestAnimationFrame(tick2)
      }
    }
    let holdStart = 0
    const tick2 = (now: number) => {
      if (!holdStart) holdStart = now
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(59,123,234,${p.a})`
        ctx.arc(p.tx, p.ty, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (now - holdStart < 500) raf = requestAnimationFrame(tick2)
      else setVisible(false)
    }

    // espera a fonte carregar para o formato do texto ficar correto
    let cancelled = false
    const begin = () => !cancelled && (raf = requestAnimationFrame(tick))
    if (document.fonts?.load) {
      Promise.race([
        document.fonts.load(`900 ${fontSize}px Orbitron`),
        new Promise((r) => setTimeout(r, 1200)),
      ]).then(() => {
        if (cancelled) return
        // re-rasteriza com a fonte correta
        octx.clearRect(0, 0, w, h)
        octx.fillText('NEXORA', w / 2, h / 2)
        const d2 = octx.getImageData(0, 0, w, h).data
        const targets: [number, number][] = []
        for (let y = 0; y < h; y += gap)
          for (let x = 0; x < w; x += gap) if (d2[(y * w + x) * 4 + 3] > 128) targets.push([x, y])
        particles.length = Math.min(particles.length, targets.length)
        while (particles.length < targets.length) {
          particles.push({ x: Math.random() * w, y: Math.random() * h, tx: 0, ty: 0, vx: 0, vy: 0, r: Math.random() * 1.2 + 0.8, a: Math.random() * 0.5 + 0.5 })
        }
        particles.forEach((p, i) => {
          p.tx = targets[i][0]
          p.ty = targets[i][1]
        })
        begin()
      })
    } else begin()

    // garantia: nunca segura o usuário por mais de 6s
    const failsafe = window.setTimeout(() => setVisible(false), 6000)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.clearTimeout(failsafe)
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-nx-black"
          exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flat-grid absolute inset-0 opacity-60" />
          <canvas ref={canvasRef} className="absolute inset-0" style={{ filter: 'drop-shadow(0 0 8px rgba(59,123,234,0.7))' }} />
          <div className="absolute bottom-16 left-1/2 w-56 -translate-x-1/2 text-center">
            <div className="h-px w-full overflow-hidden bg-nx-card">
              <div className="h-full bg-nx-gradient shadow-glow transition-[width] duration-100" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-3 font-display text-[10px] tracking-[0.5em] text-nx-gray">
              INICIALIZANDO {String(progress).padStart(3, '0')}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
