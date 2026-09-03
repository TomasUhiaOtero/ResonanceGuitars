import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import useReducedMotion from '../hooks/useReducedMotion.js'
import site from '../data/site.js'

// Con solo 2 copias, en pantallas anchas el periodo de la vuelta puede ser
// más corto que el viewport: el track se queda sin contenido antes de
// volver a engancharse y asoma un hueco de fondo vacío. Con 6 copias el
// tramo recorrido por vuelta sigue siendo el mismo (mismo `duration`), pero
// hay pista de sobra para cubrir monitores anchos sin dejar hueco.
const COPIES = 6

export default function WoodsMarquee() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const root = ref.current
    let tween
    const ctx = gsap.context(() => {
      // Dos copias consecutivas cualquiera están separadas exactamente por
      // un periodo (ancho de una copia + su hueco de cierre), así que
      // -(100/COPIES)% reengancha sin salto, sea cual sea COPIES.
      tween = gsap.to('[data-track]', {
        xPercent: -100 / COPIES,
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

  const items = Array.from({ length: COPIES }, () => site.woods).flat()

  return (
    <section
      ref={ref}
      className="overflow-hidden border-y border-white/10 py-8"
      aria-label="Maderas que trabajamos"
    >
      <div data-track className="flex w-max gap-16 pr-16">
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="text-2xl font-medium tracking-tight text-mute md:text-3xl"
            aria-hidden={i >= site.woods.length}
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}
