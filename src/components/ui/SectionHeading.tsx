import Reveal from './Reveal'
import GlitchText from './GlitchText'
import TypingText from './TypingText'

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  effect = 'none',
  align = 'left',
}: {
  eyebrow: string
  title: string
  subtitle?: string
  effect?: 'glitch' | 'typing' | 'none'
  align?: 'left' | 'center'
}) {
  const center = align === 'center'
  return (
    <div className={`mb-14 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <Reveal>
        <span className="eyebrow">
          <span className="h-px w-8 bg-nx-glow shadow-glow" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-5 font-display text-3xl font-bold uppercase leading-tight tracking-wide text-nx-white sm:text-4xl md:text-5xl">
          {effect === 'glitch' ? (
            <GlitchText text={title} />
          ) : effect === 'typing' ? (
            <TypingText text={title} />
          ) : (
            title
          )}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="mt-5 text-base leading-relaxed text-nx-gray md:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}
