import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Logo from './Logo'
import { NAV_LINKS } from '../lib/data'
import { getLenis, scrollToId } from '../lib/scroll'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // destaca o link da seção visível
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const lenis = getLenis()
    if (open) lenis?.stop()
    else lenis?.start()
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-nx-glow/15 bg-nx-black/60 backdrop-blur-xl' : 'bg-transparent backdrop-blur-[2px]'
      }`}
    >
      <nav className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <button onClick={() => go('inicio')} aria-label="Ir para o início">
          <Logo />
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => go(id)}
                className={`relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors ${
                  active === id ? 'text-nx-white' : 'text-nx-gray hover:text-nx-white'
                }`}
              >
                {label}
                {active === id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-nx-glow shadow-glow"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button onClick={() => go('contato')} className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
            Fale conosco
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="relative flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-nx-glow/30 bg-nx-card/50 lg:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="block h-px w-5 bg-nx-white" />
            <motion.span animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }} className="block h-px w-5 bg-nx-white" />
          </button>
        </div>
      </nav>

      <motion.div style={{ scaleX: progress }} className="absolute bottom-0 left-0 h-px w-full origin-left bg-nx-gradient shadow-glow" />
    </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex h-[100dvh] flex-col justify-center bg-nx-black/95 px-8 backdrop-blur-2xl lg:hidden"
          >
            <div className="flat-grid absolute inset-0" />
            <ul className="relative space-y-2">
              {NAV_LINKS.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <button
                    onClick={() => go(id)}
                    className="flex w-full items-baseline gap-4 py-2 text-left font-display text-3xl font-bold uppercase tracking-wider text-nx-white"
                  >
                    <span className="text-xs text-nx-glow">0{i + 1}</span>
                    {label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => go('contato')}
              className="btn-primary relative mt-10 self-start"
            >
              Fale conosco
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
