import { lazy } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SceneSlot from './ui/SceneSlot'
import GlitchText from './ui/GlitchText'
import TypingText from './ui/TypingText'
import { IconArrow } from './ui/Icons'
import { scrollToId } from '../lib/scroll'

const HeroScene = lazy(() => import('./three/HeroScene'))

export default function Hero({ mobile, ready }: { mobile: boolean; ready: boolean }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, 220])
  const opacity = useTransform(scrollY, [0, 600], [1, 0])
  const sceneScale = useTransform(scrollY, [0, 800], [1, 1.25])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  }
  const item = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <div className="perspective-grid" />
      <motion.div style={{ scale: sceneScale }} className="absolute inset-0">
        <SceneSlot className="h-full w-full">{(active) => <HeroScene mobile={mobile} active={active && ready} />}</SceneSlot>
      </motion.div>
      {/* vinheta para legibilidade */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(5,7,13,0.75)_75%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-nx-black to-transparent" />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-x-10 inset-y-16 -z-10 rounded-full bg-nx-black/55 blur-3xl" />
        <motion.div variants={container} initial="hidden" animate={ready ? 'show' : 'hidden'}>
          <motion.div variants={item} className="mb-6 flex justify-center">
            <span className="glass inline-flex items-center gap-3 rounded-full px-4 py-2 font-display text-[10px] uppercase tracking-[0.35em] text-nx-gray">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nx-glow opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-nx-glow" />
              </span>
              São Paulo · Desde 2014
            </span>
          </motion.div>
          <motion.h1
            variants={item}
            className="font-display text-[13vw] font-black uppercase leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[8.5rem]"
          >
            <GlitchText text="NEXORA" className="text-gradient text-glow" />
            <span className="mt-2 block text-[0.42em] font-semibold tracking-[0.5em] text-nx-white/90 sm:tracking-[0.6em]">
              GROUP
            </span>
          </motion.h1>
          <motion.p variants={item} className="mx-auto mt-8 max-w-xl font-display text-base tracking-[0.15em] text-nx-white sm:text-xl">
            {ready && <TypingText text="Engenharia do amanhã, hoje." speed={55} startDelay={900} />}
          </motion.p>
          <motion.p variants={item} className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-nx-gray sm:text-base">
            Inteligência artificial, energia limpa e infraestrutura digital para empresas e cidades inteligentes.
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button onClick={() => scrollToId('divisoes')} className="btn-primary w-full sm:w-auto">
              Conheça nossas soluções <IconArrow className="h-4 w-4" />
            </button>
            <button onClick={() => scrollToId('historia')} className="btn-ghost w-full sm:w-auto">
              Nossa história
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => scrollToId('sobre')}
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        aria-label="Rolar para baixo"
      >
        <span className="font-display text-[9px] uppercase tracking-[0.5em] text-nx-gray">Scroll</span>
        <span className="flex h-11 w-6 justify-center rounded-full border border-nx-glow/50 p-1.5">
          <motion.span
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-2 w-1 rounded-full bg-nx-glow shadow-glow"
          />
        </span>
      </motion.button>
    </section>
  )
}
