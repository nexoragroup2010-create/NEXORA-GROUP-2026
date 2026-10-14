import { Suspense, lazy, useEffect, useState } from 'react'
import Lenis from 'lenis'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Timeline from './components/Timeline'
import Divisions from './components/Divisions'
import Technology from './components/Technology'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Background from './components/Background'
import CustomCursor from './components/CustomCursor'
import { useIsMobile, useMediaQuery } from './hooks/useIsMobile'
import { getLenis, setLenis } from './lib/scroll'

// Recharts é pesado: carregado em um chunk separado
const Stats = lazy(() => import('./components/Stats'))

export default function App() {
  const mobile = useIsMobile()
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const [loading, setLoading] = useState(true)

  // smooth scroll com Lenis
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    setLenis(lenis)
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  // trava a rolagem enquanto o loader está visível
  useEffect(() => {
    const lenis = getLenis()
    if (loading) {
      window.scrollTo(0, 0)
      lenis?.stop()
    } else lenis?.start()
  }, [loading])

  return (
    <>
      <Background mobile={mobile} />
      {loading && <Loader onDone={() => setLoading(false)} />}
      {finePointer && <CustomCursor />}
      <Navbar />
      <main className="relative overflow-x-clip">
        <Hero mobile={mobile} ready={!loading} />
        <About />
        <Timeline />
        <div id="numeros">
          <Suspense fallback={<div className="min-h-screen" />}>
            <Stats />
          </Suspense>
        </div>
        <Divisions mobile={mobile} />
        <Technology mobile={mobile} />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
