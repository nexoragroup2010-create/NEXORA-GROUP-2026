import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import { TIMELINE } from '../lib/data'

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })
  const dotTop = useTransform(progress, (v) => `${v * 100}%`)

  return (
    <section id="historia" className="section">
      <SectionHeading
        eyebrow="02 · Nossa história"
        title="12 anos construindo o futuro"
        subtitle="De uma pequena equipe em São Paulo a um grupo presente em 8 países. Role para acender a linha do tempo."
        effect="typing"
        align="center"
      />

      <div ref={ref} className="relative mx-auto max-w-5xl">
        {/* trilho */}
        <div className="absolute bottom-0 left-5 top-0 w-px bg-nx-glow/10 md:left-1/2 md:-translate-x-1/2" />
        {/* linha que acende */}
        <motion.div
          style={{ scaleY: progress }}
          className="absolute bottom-0 left-5 top-0 w-[2px] origin-top bg-gradient-to-b from-nx-glow via-nx-glow to-nx-blue shadow-glow md:left-1/2 md:-translate-x-1/2"
        />
        <motion.div
          style={{ top: dotTop }}
          className="absolute left-5 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nx-white shadow-glow-lg md:left-1/2"
        />

        <ol className="space-y-14 md:space-y-20">
          {TIMELINE.map((m, i) => {
            const left = i % 2 === 0
            return (
              <li key={m.year} className="relative grid md:grid-cols-2 md:gap-16">
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false, margin: '-45% 0px -45% 0px' }}
                  className="absolute left-5 top-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-nx-glow bg-nx-black shadow-glow md:left-1/2"
                />
                <motion.div
                  initial={{ opacity: 0, x: left ? -60 : 60, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`ml-12 md:ml-0 ${left ? 'md:col-start-1 md:text-right' : 'md:col-start-2'}`}
                >
                  <div className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:border-nx-glow/60 hover:shadow-glow">
                    <span className="font-display text-3xl font-black text-gradient md:text-4xl">{m.year}</span>
                    <h3 className="mt-2 font-display text-sm font-semibold uppercase tracking-[0.2em] text-nx-white">{m.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-nx-gray">{m.text}</p>
                  </div>
                </motion.div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
