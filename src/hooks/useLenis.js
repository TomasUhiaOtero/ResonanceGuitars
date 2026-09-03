import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Lenis posee el scroll: llamar a window.scrollTo o a un scrollIntoView
// nativo desde fuera de su propio flujo no mueve la página (su RAF lo
// corrige al frame siguiente, como ya pasaba con el scrollIntoView de
// Soporte). Para forzar un scroll por código hay que pasar por la propia
// instancia — se guarda aquí, a nivel de módulo, para que cualquier
// componente pueda pedir "sube al inicio" sin necesitar contexto de React.
let activeLenis = null

export function scrollToTop() {
  if (activeLenis) {
    activeLenis.scrollTo(0, { duration: 1.1 })
  } else {
    // Reduced motion (o antes de que Lenis monte): sin Lenis de por medio,
    // el scroll nativo sí funciona normal.
    window.scrollTo({ top: 0, behavior: 'auto' })
  }
}

export default function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    activeLenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
      if (activeLenis === lenis) activeLenis = null
    }
  }, [enabled])
}
