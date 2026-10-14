import { lazy, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import SceneSlot from './ui/SceneSlot'
import TiltCard from './ui/TiltCard'
import { IconArrow, IconCheck, IconLeaf, IconShield, IconSpark, IconTarget } from './ui/Icons'
import { DIVISIONS, type DivisionKind } from '../lib/data'

const DivisionScene = lazy(() => import('./three/DivisionScene'))

const FALLBACK_ICON: Record<DivisionKind, typeof IconSpark> = {
  ai: IconSpark,
  energy: IconLeaf,
  cloud: IconShield,
  cities: IconTarget,
}

export default function Divisions({ mobile }: { mobile: boolean }) {
  const [open, setOpen] = useState<DivisionKind | null>(null)

  return (
    <section id="divisoes" className="section">
      <SectionHeading
        eyebrow="04 · Divisões"
        title="Quatro frentes, um ecossistema"
        subtitle="Cada divisão é especialista em sua área — e todas se conectam para entregar soluções completas."
        effect="typing"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {DIVISIONS.map((d, i) => {
          const Icon = FALLBACK_ICON[d.kind]
          const expanded = open === d.kind
          return (
            <Reveal key={d.kind} delay={(i % 2) * 0.12} className="h-full">
              <TiltCard max={6} className="glass flex flex-col overflow-hidden rounded-3xl">
                <div className="relative h-56 border-b border-nx-glow/10 sm:h-64">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,123,234,0.18),transparent_65%)]" />
                  <div className="flat-grid absolute inset-0 opacity-70" />
                  {mobile ? (
                    <div className="flex h-full items-center justify-center">
                      <motion.span
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex h-24 w-24 items-center justify-center rounded-3xl bg-nx-gradient shadow-glow-lg"
                      >
                        <Icon className="h-12 w-12 text-nx-white" />
                      </motion.span>
                    </div>
                  ) : (
                    <SceneSlot className="relative h-full w-full">
                      {(active) => <DivisionScene kind={d.kind} active={active} />}
                    </SceneSlot>
                  )}
                  <span className="absolute left-5 top-5 font-display text-[10px] uppercase tracking-[0.3em] text-nx-gray">
                    0{i + 1} / 04
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7" style={{ transform: 'translateZ(30px)' }}>
                  <p className="eyebrow">{d.tag}</p>
                  <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-wide text-nx-white">{d.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-nx-gray">{d.text}</p>

                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        {d.points.map((p) => (
                          <li key={p} className="mt-3 flex items-center gap-3 text-sm text-nx-white">
                            <IconCheck className="h-4 w-4 text-nx-glow" /> {p}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>

                  <div className="mt-auto pt-7">
                    <button
                      onClick={() => setOpen(expanded ? null : d.kind)}
                      className="group/btn inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-nx-white"
                      aria-expanded={expanded}
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-nx-glow/40 transition-all duration-300 group-hover/btn:bg-nx-glow group-hover/btn:shadow-glow">
                        <IconArrow className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-90' : 'group-hover/btn:translate-x-0.5'}`} />
                      </span>
                      {expanded ? 'Fechar' : 'Saiba mais'}
                    </button>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
