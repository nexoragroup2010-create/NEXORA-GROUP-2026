import { useEffect, useRef, useState, type ReactNode } from 'react'
import { animate, useInView } from 'framer-motion'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from 'recharts'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { COUNTERS, HEADCOUNT, REVENUE, REVENUE_SHARE } from '../lib/data'

const fmt = new Intl.NumberFormat('pt-BR')

function Counter({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 2.2, delay, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value, delay])
  return (
    <div ref={ref} className="glass group relative overflow-hidden rounded-3xl p-6 text-center sm:p-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nx-glow to-transparent opacity-60" />
      <div className="absolute -bottom-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-nx-glow/20 blur-3xl transition-all duration-500 group-hover:bg-nx-glow/40" />
      <p className="relative font-display text-4xl font-black text-nx-white text-glow sm:text-5xl lg:text-6xl">
        {fmt.format(n)}
        <span className="text-nx-glow">{suffix}</span>
      </p>
      <p className="relative mt-3 font-display text-[10px] uppercase tracking-[0.3em] text-nx-gray sm:text-xs">{label}</p>
    </div>
  )
}

function ChartTooltip({ active, payload, label, unit, prefix }: TooltipProps<number, string> & { unit?: string; prefix?: string }) {
  if (!active || !payload?.length) return null
  const p = payload[0]
  return (
    <div className="glass rounded-xl px-4 py-3 shadow-glow">
      {label && <p className="font-display text-[10px] uppercase tracking-[0.25em] text-nx-gray">{label}</p>}
      <p className="mt-1 font-display text-lg font-bold text-nx-white">
        {prefix}
        {fmt.format(Number(p.value))}
        {unit && <span className="ml-1 text-xs font-medium text-nx-glow">{unit}</span>}
      </p>
      {!label && <p className="text-xs text-nx-gray">{p.name}</p>}
    </div>
  )
}

function ChartCard({ title, caption, children, className = '' }: { title: string; caption: string; children: (show: boolean) => ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  return (
    <div ref={ref} className={`glass rounded-3xl p-5 sm:p-7 ${className}`}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-nx-white">{title}</h3>
          <p className="mt-1 text-xs text-nx-gray">{caption}</p>
        </div>
        <span className="flex h-2 w-2 shrink-0 rounded-full bg-nx-glow shadow-glow" />
      </div>
      <div className="h-[260px] sm:h-[300px]">{inView && children(inView)}</div>
    </div>
  )
}

const axisProps = {
  stroke: 'rgba(138,147,166,0.25)',
  tickLine: false,
  axisLine: false,
  tick: { fill: '#8A93A6', fontSize: 11 },
} as const

export default function Stats() {
  return (
    <section className="section">
      <SectionHeading
        eyebrow="03 · Números"
        title="Crescimento exponencial"
        subtitle="Dados que contam a nossa trajetória — da fundação em 2014 à presença global em 2026."
        effect="glitch"
      />

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {COUNTERS.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.1}>
            <Counter {...c} delay={i * 0.15} />
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <ChartCard title="Faturamento anual" caption="Em milhões de reais · 2014–2026" className="[&_.recharts-area-curve]:drop-shadow-[0_0_6px_rgba(59,123,234,0.9)]">
            {() => (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B7BEA" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#1F4E9C" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 6" />
                  <XAxis dataKey="year" {...axisProps} interval="preserveStartEnd" minTickGap={16} />
                  <YAxis {...axisProps} width={48} />
                  <Tooltip content={<ChartTooltip unit="mi" prefix="R$ " />} cursor={{ stroke: '#3B7BEA', strokeDasharray: '4 4' }} />
                  <Area
                    type="monotone"
                    dataKey="receita"
                    stroke="#3B7BEA"
                    strokeWidth={2.5}
                    fill="url(#revFill)"
                    activeDot={{ r: 6, fill: '#F5F7FA', stroke: '#3B7BEA', strokeWidth: 3 }}
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </Reveal>

        <Reveal delay={0.15}>
          <ChartCard title="Receita por divisão" caption="Participação em 2026">
            {() => (
              <div className="relative h-full">
                <ResponsiveContainer width="100%" height="78%">
                  <PieChart>
                    <Tooltip content={<ChartTooltip unit="%" />} />
                    <Pie
                      data={REVENUE_SHARE}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="62%"
                      outerRadius="88%"
                      paddingAngle={3}
                      stroke="#05070D"
                      strokeWidth={2}
                      animationDuration={1600}
                    >
                      {REVENUE_SHARE.map((d) => (
                        <Cell key={d.name} fill={d.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-x-0 top-0 flex h-[78%] flex-col items-center justify-center">
                  <span className="font-display text-2xl font-black text-nx-white">4</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-nx-gray">divisões</span>
                </div>
                <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
                  {REVENUE_SHARE.map((d) => (
                    <li key={d.name} className="flex items-center gap-2 text-xs text-nx-gray">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color, boxShadow: `0 0 8px ${d.color}` }} />
                      <span className="truncate">{d.name.replace('Nexora ', '')}</span>
                      <span className="ml-auto font-display text-nx-white">{d.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </ChartCard>
        </Reveal>

        <Reveal className="lg:col-span-3">
          <ChartCard title="Crescimento de colaboradores" caption="Total de pessoas ao fim de cada ano">
            {() => (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={HEADCOUNT} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B7BEA" />
                      <stop offset="100%" stopColor="#1F4E9C" stopOpacity={0.5} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 6" />
                  <XAxis dataKey="year" {...axisProps} interval="preserveStartEnd" minTickGap={8} />
                  <YAxis {...axisProps} width={48} />
                  <Tooltip content={<ChartTooltip unit="pessoas" />} cursor={{ fill: 'rgba(59,123,234,0.08)' }} />
                  <Bar dataKey="colaboradores" fill="url(#barFill)" radius={[6, 6, 0, 0]} maxBarSize={44} animationDuration={1800} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </Reveal>
      </div>
    </section>
  )
}
