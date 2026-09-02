import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import useReducedMotion from '../hooks/useReducedMotion.js'
import site from '../data/site.js'

export default function SeriesMarquee() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const root = ref.current
    let tween
    const ctx = gsap.context(() => {
      // Dos copias idénticas: cuando la primera ha recorrido su ancho,
      // la segunda está exactamente en su sitio y el reinicio no se ve.
      tween = gsap.to('[data-track]', {
        xPercent: -50,
        duration: 28,
        ease: 'none',
        repeat: -1,
      })
    }, ref)

    const pause = () => tween?.pause()
    const play = () => tween?.play()
    root.addEventListener('mouseenter', pause)
    root.addEventListener('mouseleave', play)
    root.addEventListener('focusin', pause)
    root.addEventListener('focusout', play)

    return () => {
      root.removeEventListener('mouseenter', pause)
      root.removeEventListener('mouseleave', play)
      root.removeEventListener('focusin', pause)
      root.removeEventListener('focusout', play)
      ctx.revert()
    }
  }, [reduced])

  const items = [...site.series, ...site.series]

  return (
    <section
      ref={ref}
      className="overflow-hidden border-y border-white/10 py-8"
      aria-label="Nuestras series"
    >
      <div data-track className="flex w-max gap-16 pr-16">
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="text-2xl font-medium tracking-tight text-mute md:text-3xl"
            aria-hidden={i >= site.series.length}
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}
