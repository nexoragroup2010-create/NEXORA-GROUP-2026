import { Suspense, useEffect, useState, type ReactNode } from 'react'
import { useNearView } from '../../hooks/useInView'

/**
 * Monta a cena 3D somente quando ela se aproxima da viewport (lazy) e
 * pausa a renderização quando sai da tela.
 */
export default function SceneSlot({
  children,
  className = '',
}: {
  children: (active: boolean) => ReactNode
  className?: string
}) {
  const [ref, near] = useNearView<HTMLDivElement>('300px', true)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])

  return (
    <div ref={ref} className={className}>
      {near && <Suspense fallback={<ScenePlaceholder />}>{children(active)}</Suspense>}
    </div>
  )
}

export function ScenePlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border border-nx-glow/20 border-t-nx-glow shadow-glow" />
    </div>
  )
}
