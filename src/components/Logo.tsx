export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9 drop-shadow-[0_0_8px_rgba(59,123,234,0.8)]" aria-hidden>
        <defs>
          <linearGradient id="nx-logo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1F4E9C" />
            <stop offset="1" stopColor="#3B7BEA" />
          </linearGradient>
        </defs>
        <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="none" stroke="url(#nx-logo)" strokeWidth="1.5" />
        <path d="M13 27V13l14 14V13" fill="none" stroke="#F5F7FA" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-display text-sm font-bold leading-none tracking-[0.25em] text-nx-white">
        NEXORA<span className="ml-1.5 font-medium text-nx-glow">GROUP</span>
      </span>
    </span>
  )
}
