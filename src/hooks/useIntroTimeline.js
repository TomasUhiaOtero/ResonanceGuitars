import { useEffect, useState } from 'react'
import gsap from 'gsap'
import useReducedMotion from './useReducedMotion.js'

export default function useIntroTimeline({ scope, ready }) {
  const [done, setDone] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!ready || !scope.current) return

    let ctx
    let cancelled = false

    // Esperamos a las fuentes: animar el título antes de que Inter cargue
    // provoca un salto de métrica a mitad de la animación.
    // Red de seguridad: si document.fonts.ready se rechaza o no resuelve,
    // arrancamos igual. Una cortina que no se levanta deja la pagina inservible.
    let timeoutId
    const fontsSettled = Promise.race([
      document.fonts.ready.catch(() => {}),
      new Promise((resolve) => {
        timeoutId = setTimeout(resolve, 1500)
      }),
    ])

    fontsSettled.then(() => {
      if (cancelled) return

      ctx = gsap.context(() => {
        if (reduced) {
          gsap.set('[data-curtain]', { display: 'none' })
          gsap.to(
            ['[data-nav]', '[data-overline]', '[data-word]', '[data-body]', '[data-cta]', '[data-stats]', '[data-card]'],
            { opacity: 1, duration: 0.3, onComplete: () => setDone(true) },
          )
          return
        }

        const tl = gsap.timeline({
          defaults: { ease: 'expo.out' },
          onComplete: () => setDone(true),
        })

        tl.to('[data-curtain]', { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 0)
          .set('[data-curtain]', { display: 'none' })
          .fromTo('[data-nav]', { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.2)
          .fromTo('[data-overline]', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.35)
          .fromTo(
            '[data-word]',
            { yPercent: 110 },
            { yPercent: 0, duration: 1.1, stagger: 0.07 },
            0.45,
          )
          .fromTo('[data-body]', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.9)
          .fromTo(
            '[data-cta]',
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
            1.05,
          )
          .fromTo('[data-stats]', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.15)
          .fromTo('[data-card]', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 }, 1.2)
      })
    })

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
      ctx?.revert()
    }
  }, [ready, scope, reduced])

  return { done }
}
