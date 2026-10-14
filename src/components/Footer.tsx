import Logo from './Logo'
import { SOCIALS } from './ui/Icons'
import { DIVISIONS, NAV_LINKS } from '../lib/data'
import { scrollToId } from '../lib/scroll'

export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-nx-glow/15 bg-nx-black/80 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nx-glow to-transparent shadow-glow" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-12 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="col-span-2">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-nx-gray">
            Conectando pessoas, dados e energia para construir o futuro. Inteligência artificial, energia limpa e
            infraestrutura digital desde 2014.
          </p>
          <div className="mt-6 flex gap-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a key={label} href={href} aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-nx-glow/30 text-nx-gray transition-all hover:-translate-y-1 hover:border-nx-glow hover:text-nx-white hover:shadow-glow">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-nx-white">Navegação</p>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <button onClick={() => scrollToId(id)} className="text-sm text-nx-gray transition-colors hover:text-nx-glow">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-nx-white">Divisões</p>
          <ul className="mt-5 space-y-3">
            {DIVISIONS.map((d) => (
              <li key={d.kind}>
                <button onClick={() => scrollToId('divisoes')} className="text-sm text-nx-gray transition-colors hover:text-nx-glow">
                  {d.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-nx-glow/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-nx-gray sm:flex-row sm:px-8">
          <p>© 2026 Nexora Group. Todos os direitos reservados.</p>
          <p className="font-display tracking-[0.2em]">ENGENHARIA DO AMANHÃ, HOJE.</p>
        </div>
      </div>
    </footer>
  )
}
