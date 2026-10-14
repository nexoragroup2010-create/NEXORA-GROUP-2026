import type { SVGProps } from 'react'

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
}

type P = SVGProps<SVGSVGElement>

export const IconTarget = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></svg>
)
export const IconEye = (p: P) => (
  <svg {...base} {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
)
export const IconDiamond = (p: P) => (
  <svg {...base} {...p}><path d="M6 3h12l4 6-10 12L2 9l4-6z" /><path d="M2 9h20M12 21 8 9l4-6 4 6-4 12" /></svg>
)
export const IconShield = (p: P) => (
  <svg {...base} {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z" /><path d="m9 12 2 2 4-4" /></svg>
)
export const IconLeaf = (p: P) => (
  <svg {...base} {...p}><path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15" /><path d="M5 19c3-4 6-6 10-8" /></svg>
)
export const IconSpark = (p: P) => (
  <svg {...base} {...p}><path d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" /></svg>
)
export const IconArrow = (p: P) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const IconPin = (p: P) => (
  <svg {...base} {...p}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
)
export const IconMail = (p: P) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
)
export const IconPhone = (p: P) => (
  <svg {...base} {...p}><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" /></svg>
)
export const IconLinkedin = (p: P) => (
  <svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></svg>
)
export const IconInstagram = (p: P) => (
  <svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5v.01" /></svg>
)
export const IconX = (p: P) => (
  <svg {...base} {...p}><path d="M4 4l16 16M20 4 4 20" /></svg>
)
export const IconYoutube = (p: P) => (
  <svg {...base} {...p}><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3V9z" /></svg>
)
export const IconGithub = (p: P) => (
  <svg {...base} {...p}><path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.8 2.8 5.8 3.1 5.8 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /></svg>
)
export const IconCheck = (p: P) => (
  <svg {...base} {...p}><path d="m5 12 5 5 9-10" /></svg>
)
export const IconChevron = (p: P) => (
  <svg {...base} {...p}><path d="m9 6 6 6-6 6" /></svg>
)

export const SOCIALS = [
  { label: 'LinkedIn', href: '#', Icon: IconLinkedin },
  { label: 'Instagram', href: '#', Icon: IconInstagram },
  { label: 'X', href: '#', Icon: IconX },
  { label: 'YouTube', href: '#', Icon: IconYoutube },
  { label: 'GitHub', href: '#', Icon: IconGithub },
]
