import { lazy } from 'react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import SceneSlot from './ui/SceneSlot'
import { IconLeaf, IconShield, IconSpark } from './ui/Icons'

const NetworkScene = lazy(() => import('./three/NetworkScene'))

const PILLARS = [
  {
    Icon: IconSpark,
    title: 'Inovação',
    text: 'Laboratórios de P&D em IA generativa, computação de borda e gêmeos digitais, com mais de 60 patentes registradas.',
    stat: '15%',
    statLabel: 'da receita em P&D',
  },
  {
    Icon: IconShield,
    title: 'Segurança',
    text: 'Arquitetura zero trust, criptografia ponta a ponta e certificações ISO 27001 e SOC 2 em toda a operação.',
    stat: '99,99%',
    statLabel: 'de disponibilidade',
  },
  {
    Icon: IconLeaf,
    title: 'Sustentabilidade',
    text: 'Data centers alimentados por energia renovável própria e metas de carbono negativo até 2030.',
    stat: '100%',
    statLabel: 'energia renovável',
  },
]

export default function Technology({ mobile }: { mobile: boolean }) {
  return (
    <section id="tecnologia" className="relative overflow-hidden">
      <div className="section grid items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <SectionHeading
            eyebrow="05 · Tecnologia"
            title="Uma rede viva de inteligência"
            subtitle="Milhões de dispositivos, data centers e modelos de IA conectados em tempo real. Essa é a malha que sustenta tudo o que construímos."
            effect="glitch"
          />
          <div className="space-y-4">
            {PILLARS.map(({ Icon, title, text, stat, statLabel }, i) => (
              <Reveal key={title} delay={i * 0.12} direction="right">
                <div className="glass group flex gap-5 rounded-2xl p-5 transition-all duration-500 hover:border-nx-glow/60 hover:shadow-glow">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-nx-glow/40 bg-nx-blue/20 transition-all group-hover:bg-nx-gradient group-hover:shadow-glow">
                    <Icon className="h-6 w-6 text-nx-glow transition-colors group-hover:text-nx-white" />
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-nx-white">{title}</h3>
                      <p className="font-display text-xs text-nx-glow">
                        {stat} <span className="text-nx-gray">{statLabel}</span>
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-nx-gray">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal direction="left" className="order-1 lg:order-2">
          <div className="relative aspect-square w-full">
            <div className="absolute inset-[10%] rounded-full border border-nx-glow/10" />
            <div className="absolute inset-[22%] rounded-full border border-dashed border-nx-glow/15" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(31,78,156,0.35),transparent_60%)]" />
            <SceneSlot className="absolute inset-0">{(active) => <NetworkScene mobile={mobile} active={active} />}</SceneSlot>
            {[
              { label: 'Latência', value: '4 ms', pos: 'left-0 top-[12%]' },
              { label: 'Nós ativos', value: '2,4 mi', pos: 'right-0 top-[30%]' },
              { label: 'Dados/dia', value: '18 PB', pos: 'bottom-[12%] left-[8%]' },
            ].map((t) => (
              <div key={t.label} className={`glass pointer-events-none absolute rounded-xl px-4 py-2.5 ${t.pos}`}>
                <p className="text-[10px] uppercase tracking-[0.25em] text-nx-gray">{t.label}</p>
                <p className="font-display text-base font-bold text-nx-white">{t.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
