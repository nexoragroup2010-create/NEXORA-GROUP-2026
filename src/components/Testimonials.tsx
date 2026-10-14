import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { IconChevron } from './ui/Icons'
import { TESTIMONIALS } from '../lib/data'

const AUTOPLAY_MS = 7000

export default function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1])
  const [paused, setPaused] = useState(false)
  const total = TESTIMONIALS.length

  const go = useCallback(
    (step: number) => setState(([i]) => [(i + step + total) % total, step]),
    [total],
  )

  useEffect(() => {
    if (paused) return
    const id = window.setTimeout(() => go(1), AUTOPLAY_MS)
    return () => window.clearTimeout(id)
  }, [index, paused, go])

  const t = TESTIMONIALS[index]
  const initials = t.name.split(' ').map((p) => p[0]).slice(0, 2).join('')

  return (
    <section id="depoimentos" className="section">
      <SectionHeading eyebrow="06 · Depoimentos" title="Quem confia na Nexora" effect="typing" align="center" />

      <Reveal>
        <div
          className="glass relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] px-6 py-12 sm:px-14 sm:py-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <span aria-hidden className="pointer-events-none absolute -left-2 -top-10 font-display text-[12rem] leading-none text-nx-blue/20">
            “
          </span>
          <div className="relative min-h-[260px] sm:min-h-[220px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: dir * -60, filter: 'blur(8px)' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1)
                  else if (info.offset.x > 60) go(-1)
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                <blockquote className="text-lg font-light leading-relaxed text-nx-white sm:text-2xl">“{t.quote}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-nx-gradient font-display text-sm font-bold text-nx-white shadow-glow">
                    {initials}
                  </span>
                  <span>
                    <span className="block font-display text-sm font-semibold uppercase tracking-[0.15em] text-nx-white">{t.name}</span>
                    <span className="mt-1 block text-sm text-nx-gray">{t.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="relative mt-10 flex items-center justify-between">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Depoimento ${i + 1}`}
                  className="relative h-1.5 w-10 overflow-hidden rounded-full bg-nx-glow/15"
                >
                  {i === index && (
                    <motion.span
                      key={`${index}-${paused}`}
                      initial={{ width: paused ? '100%' : '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: 'linear' }}
                      className="absolute inset-y-0 left-0 bg-nx-glow shadow-glow"
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => go(-1)} aria-label="Anterior" className="flex h-11 w-11 items-center justify-center rounded-full border border-nx-glow/40 transition-all hover:bg-nx-glow hover:shadow-glow">
                <IconChevron className="h-5 w-5 rotate-180" />
              </button>
              <button onClick={() => go(1)} aria-label="Próximo" className="flex h-11 w-11 items-center justify-center rounded-full border border-nx-glow/40 transition-all hover:bg-nx-glow hover:shadow-glow">
                <IconChevron className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
