import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import TiltCard from './ui/TiltCard'
import { IconDiamond, IconEye, IconTarget } from './ui/Icons'

const VALUES = ['Inovação', 'Transparência', 'Sustentabilidade', 'Excelência', 'Pessoas']

const CARDS = [
  {
    Icon: IconTarget,
    label: 'Missão',
    title: 'Conectar pessoas, dados e energia para construir o futuro.',
    body: 'Desenvolvemos tecnologia que integra inteligência, infraestrutura e sustentabilidade em uma única plataforma de transformação.',
  },
  {
    Icon: IconEye,
    label: 'Visão',
    title: 'Ser referência global em inovação sustentável até 2035.',
    body: 'Queremos que cada cidade, empresa e comunidade tenha acesso a tecnologia limpa, segura e inteligente.',
  },
  {
    Icon: IconDiamond,
    label: 'Valores',
    title: 'O que guia cada decisão.',
    body: null,
  },
]

export default function About() {
  return (
    <section id="sobre" className="section">
      <div className="grid items-end gap-10 lg:grid-cols-2">
        <SectionHeading eyebrow="01 · Sobre nós" title="Tecnologia com propósito" effect="glitch" />
        <Reveal delay={0.2} className="mb-14">
          <p className="text-lg leading-relaxed text-nx-gray">
            A <strong className="font-semibold text-nx-white">Nexora Group</strong> é um grupo de tecnologia fundado em 2014
            em São Paulo. Desenvolvemos soluções em{' '}
            <span className="text-nx-glow">Inteligência Artificial</span>, <span className="text-nx-glow">energia limpa</span> e{' '}
            <span className="text-nx-glow">infraestrutura digital</span> para empresas e cidades inteligentes — unindo engenharia
            de ponta e responsabilidade ambiental para acelerar a próxima década.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {CARDS.map(({ Icon, label, title, body }, i) => (
          <Reveal key={label} delay={i * 0.12} className="h-full">
            <TiltCard className="glass rounded-3xl p-8">
              <div style={{ transform: 'translateZ(40px)' }} className="relative">
                <div className="mb-8 flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-nx-gradient shadow-glow">
                    <Icon className="h-7 w-7 text-nx-white" />
                  </span>
                  <span className="font-display text-5xl font-black text-nx-blue/30">0{i + 1}</span>
                </div>
                <p className="eyebrow mb-3">{label}</p>
                <h3 className="font-display text-lg font-semibold leading-snug text-nx-white">{title}</h3>
                {body ? (
                  <p className="mt-4 text-sm leading-relaxed text-nx-gray">{body}</p>
                ) : (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {VALUES.map((v) => (
                      <li
                        key={v}
                        className="rounded-full border border-nx-glow/30 bg-nx-blue/10 px-3 py-1.5 text-xs font-medium text-nx-white transition-all hover:border-nx-glow hover:shadow-glow"
                      >
                        {v}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
