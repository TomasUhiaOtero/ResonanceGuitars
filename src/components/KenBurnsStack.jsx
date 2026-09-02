import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import useReducedMotion from '../hooks/useReducedMotion.js'

export default function KenBurnsStack({ images, hold = 6, fade = 1.4, onReady }) {
  const rootRef = useRef(null)
  const readyRef = useRef(onReady)
  readyRef.current = onReady
  const reduced = useReducedMotion()
  const imagesKey = images.join('|')

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const slides = Array.from(root.querySelectorAll('[data-slide]'))
    let ctx
    let cancelled = false

    const decodeAll = Promise.all(
      slides.map((img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve())),
    )

    decodeAll.then(() => {
      if (cancelled) return

      if (reduced) {
        gsap.set(slides[0], { opacity: 1 })
        readyRef.current?.()
        return
      }

      ctx = gsap.context(() => {
        const step = hold
        const span = hold + fade

        gsap.set(slides, { opacity: 0, scale: 1.06, xPercent: 0, willChange: 'transform, opacity' })
        gsap.set(slides[0], { opacity: 1 })

        const tl = gsap.timeline({ repeat: -1 })

        slides.forEach((slide, i) => {
          const at = i * step
          const drift = i % 2 === 0 ? 2 : -2

          // Movimiento: zoom lento y pan lateral. Lineal a propósito:
          // cualquier easing hace que el "vídeo" parezca acelerar.
          tl.fromTo(
            slide,
            { scale: 1.06, xPercent: 0 },
            { scale: 1.18, xPercent: drift, duration: span, ease: 'none' },
            at,
          )

          // La primera ya está visible en t=0; las demás entran con crossfade.
          if (i > 0) {
            tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: fade, ease: 'power1.inOut' }, at)
          }

          // Todas salvo la última se apagan cuando entra la siguiente.
          if (i < slides.length - 1) {
            tl.to(slide, { opacity: 0, duration: fade, ease: 'power1.inOut' }, at + step)
          }
        })

        // Cierre del bucle: la última se funde sobre la primera, que vuelve
        // a su estado inicial para que el salto sea invisible.
        const last = slides.length - 1
        const end = last * step
        tl.fromTo(
          slides[0],
          { opacity: 0, scale: 1.06, xPercent: 0 },
          { opacity: 1, duration: fade, ease: 'power1.inOut', immediateRender: false },
          end + step,
        )
        tl.to(slides[last], { opacity: 0, duration: fade, ease: 'power1.inOut' }, end + step)
        tl.set({}, {}, end + step + fade)
      }, root)

      readyRef.current?.()
    })

    return () => {
      cancelled = true
      ctx?.revert()
    }
    // Dependemos del contenido de `images` (imagesKey), no de su identidad: los slides se leen del DOM, así que un array recalculado con el mismo contenido no debe reiniciar el timeline.
  }, [imagesKey, hold, fade, reduced])

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {images.map((src, i) => (
        <img
          key={src}
          data-slide
          src={src}
          alt=""
          decoding="async"
          fetchPriority={i === 0 ? 'high' : 'low'}
          className="absolute inset-0 h-full w-full object-cover opacity-0"
        />
      ))}
    </div>
  )
}
