import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { IconArrow, IconCheck, IconMail, IconPhone, IconPin, SOCIALS } from './ui/Icons'

type Fields = { nome: string; email: string; empresa: string; mensagem: string }
type Errors = Partial<Record<keyof Fields, string>>

const EMPTY: Fields = { nome: '', email: '', empresa: '', mensagem: '' }

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.nome.trim().length < 2) e.nome = 'Informe seu nome completo.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Informe um e-mail válido.'
  if (f.empresa.trim().length < 2) e.empresa = 'Informe o nome da empresa.'
  if (f.mensagem.trim().length < 10) e.mensagem = 'A mensagem precisa ter pelo menos 10 caracteres.'
  return e
}

function Field({
  id,
  label,
  error,
  valid,
  children,
}: {
  id: string
  label: string
  error?: string
  valid: boolean
  children: ReactNode
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 flex items-center justify-between font-display text-[10px] uppercase tracking-[0.25em] text-nx-gray">
        {label}
        {valid && <IconCheck className="h-4 w-4 text-nx-glow" />}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="mt-2 block text-xs text-nx-glow"
            role="alert"
          >
            ⚠ {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )
}

export default function Contact() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const errors = validate(fields)

  const set = (k: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }))
  const blur = (k: keyof Fields) => () => setTouched((t) => ({ ...t, [k]: true }))

  const cls = (k: keyof Fields) =>
    `input ${touched[k] && errors[k] ? '!border-nx-glow/80 bg-nx-blue/10' : ''} ${touched[k] && !errors[k] ? '!border-nx-glow/50' : ''}`

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTouched({ nome: true, email: true, empresa: true, mensagem: true })
    if (Object.keys(errors).length) return
    setStatus('sending')
    // simulação de envio
    window.setTimeout(() => {
      setStatus('sent')
      setFields(EMPTY)
      setTouched({})
      window.setTimeout(() => setStatus('idle'), 4500)
    }, 1400)
  }

  return (
    <section id="contato" className="section">
      <SectionHeading
        eyebrow="07 · Contato"
        title="Vamos construir o amanhã juntos"
        subtitle="Conte sobre o seu desafio. Nossa equipe responde em até 24 horas úteis."
        effect="glitch"
      />

      <div className="grid gap-8 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <form onSubmit={submit} noValidate className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="nome" label="Nome" error={touched.nome ? errors.nome : undefined} valid={!!touched.nome && !errors.nome}>
                <input id="nome" className={cls('nome')} placeholder="Seu nome" value={fields.nome} onChange={set('nome')} onBlur={blur('nome')} autoComplete="name" />
              </Field>
              <Field id="email" label="E-mail" error={touched.email ? errors.email : undefined} valid={!!touched.email && !errors.email}>
                <input id="email" type="email" className={cls('email')} placeholder="voce@empresa.com" value={fields.email} onChange={set('email')} onBlur={blur('email')} autoComplete="email" />
              </Field>
              <div className="sm:col-span-2">
                <Field id="empresa" label="Empresa" error={touched.empresa ? errors.empresa : undefined} valid={!!touched.empresa && !errors.empresa}>
                  <input id="empresa" className={cls('empresa')} placeholder="Nome da empresa" value={fields.empresa} onChange={set('empresa')} onBlur={blur('empresa')} autoComplete="organization" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field id="mensagem" label="Mensagem" error={touched.mensagem ? errors.mensagem : undefined} valid={!!touched.mensagem && !errors.mensagem}>
                  <textarea id="mensagem" rows={5} className={`${cls('mensagem')} resize-none`} placeholder="Como podemos ajudar?" value={fields.mensagem} onChange={set('mensagem')} onBlur={blur('mensagem')} />
                </Field>
              </div>
            </div>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-nx-gray">Seus dados estão protegidos conforme a LGPD.</p>
              <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-70 sm:w-auto">
                {status === 'sending' ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-nx-white/30 border-t-nx-white" /> Enviando…
                  </>
                ) : (
                  <>
                    Enviar mensagem <IconArrow className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {status === 'sent' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-nx-card/95 p-8 text-center backdrop-blur-xl"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-nx-gradient shadow-glow-lg"
                  >
                    <IconCheck className="h-10 w-10 text-nx-white" />
                  </motion.span>
                  <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-wider text-nx-white">Mensagem enviada!</h3>
                  <p className="mt-2 max-w-sm text-sm text-nx-gray">Obrigado pelo contato. Em breve um especialista Nexora falará com você.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-2">
          <div className="flex h-full flex-col gap-6">
            <div className="glass space-y-5 rounded-3xl p-7">
              {[
                { Icon: IconPin, label: 'Endereço', value: 'Av. Brigadeiro Faria Lima, 4500 — Itaim Bibi, São Paulo – SP' },
                { Icon: IconMail, label: 'E-mail', value: 'contato@nexoragroup.com' },
                { Icon: IconPhone, label: 'Telefone', value: '+55 (11) 4000-2026' },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-nx-glow/30 bg-nx-blue/15">
                    <Icon className="h-5 w-5 text-nx-glow" />
                  </span>
                  <div>
                    <p className="font-display text-[10px] uppercase tracking-[0.25em] text-nx-gray">{label}</p>
                    <p className="mt-1 text-sm text-nx-white">{value}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a key={label} href={href} aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-nx-glow/30 text-nx-gray transition-all hover:-translate-y-1 hover:border-nx-glow hover:text-nx-white hover:shadow-glow">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            <StylizedMap />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Mapa estilizado em SVG com os 8 países de atuação. */
function StylizedMap() {
  const points = [
    { x: 118, y: 150, label: 'São Paulo', hq: true },
    { x: 96, y: 160, label: 'Santiago' },
    { x: 104, y: 120, label: 'Lima' },
    { x: 92, y: 92, label: 'Bogotá' },
    { x: 70, y: 70, label: 'Cidade do México' },
    { x: 196, y: 62, label: 'Lisboa' },
    { x: 206, y: 56, label: 'Madri' },
    { x: 108, y: 168, label: 'Buenos Aires' },
  ]
  const hq = points[0]
  return (
    <div className="glass relative flex-1 overflow-hidden rounded-3xl p-5">
      <p className="font-display text-[10px] uppercase tracking-[0.25em] text-nx-gray">Presença global · 8 países</p>
      <svg viewBox="0 0 280 200" className="mt-3 h-auto w-full">
        <defs>
          <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="#1F4E9C" opacity="0.5" />
          </pattern>
        </defs>
        {/* continentes simplificados */}
        <path d="M40 30 L110 25 L125 55 L95 80 L80 90 L60 75 L45 55Z" fill="url(#dots)" />
        <path d="M85 90 L120 95 L140 120 L125 160 L110 185 L98 175 L90 130Z" fill="url(#dots)" />
        <path d="M180 30 L240 25 L255 50 L225 70 L190 72 L178 52Z" fill="url(#dots)" />
        <path d="M190 80 L235 82 L240 120 L220 160 L200 150 L188 110Z" fill="url(#dots)" />
        {points.slice(1).map((p) => (
          <path
            key={p.label}
            d={`M${hq.x} ${hq.y} Q ${(hq.x + p.x) / 2} ${Math.min(hq.y, p.y) - 30} ${p.x} ${p.y}`}
            fill="none"
            stroke="#3B7BEA"
            strokeWidth="0.8"
            strokeDasharray="3 3"
            opacity="0.7"
          >
            <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1.2s" repeatCount="indefinite" />
          </path>
        ))}
        {points.map((p) => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r={p.hq ? 4 : 2.5} fill={p.hq ? '#F5F7FA' : '#3B7BEA'} />
            <circle cx={p.x} cy={p.y} r="3" fill="none" stroke="#3B7BEA" strokeWidth="0.8">
              <animate attributeName="r" from="3" to="12" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.9" to="0" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <title>{p.label}</title>
          </g>
        ))}
      </svg>
    </div>
  )
}
