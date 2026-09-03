import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../hooks/useReducedMotion.js'
import taller from '../data/taller.js'

gsap.registerPlugin(ScrollTrigger)

// Cuerdas: de la cejuela (y=112, dentro de la anchura del mástil) al
// puente (y=555, más abierto para que se vean por fuera del diapasón).
// Se generan por índice en vez de a mano — 6 pares de coordenadas menos
// que mantener sincronizados si algún día cambia el diseño.
const STRINGS = Array.from({ length: 6 }, (_, i) => {
  const x1 = 187 + i * 5
  const x2 = 165 + i * 14
  const y1 = 112
  const y2 = 555
  const length = Math.hypot(x2 - x1, y2 - y1)
  return { x1, y1, x2, y2, length }
})

const PEGS = [
  { cx: 148, cy: 45 },
  { cx: 148, cy: 70 },
  { cx: 148, cy: 95 },
  { cx: 252, cy: 45 },
  { cx: 252, cy: 70 },
  { cx: 252, cy: 95 },
]

// Como useLenis: el scroll-scrub usa el wrapper alto (500vh) como
// trigger y un `sticky` de CSS para "fijar" el contenido — evita el
// pin de ScrollTrigger (menos fricción con Lenis, no hay que recalcular
// pinSpacing si el contenido cambia de alto).
export default function GuitarAssembly() {
  const wrapRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !wrapRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      tl.fromTo(
        '[data-part="body"]',
        { opacity: 0, y: 70, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' },
        0,
      )
        .fromTo(
          '[data-checkpoint="0"]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4 },
          0.15,
        )
        .to('[data-checkpoint="0"]', { opacity: 0, y: -16, duration: 0.3 }, 0.85)

        .fromTo(
          '[data-part="neck"]',
          { opacity: 0, x: -90, rotate: -14, transformOrigin: '50% 100%' },
          { opacity: 1, x: 0, rotate: 0, duration: 1, ease: 'power2.out' },
          1,
        )
        .fromTo(
          '[data-checkpoint="1"]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4 },
          1.15,
        )
        .to('[data-checkpoint="1"]', { opacity: 0, y: -16, duration: 0.3 }, 1.85)

        .fromTo(
          '[data-part="rosette"]',
          { opacity: 0, scale: 0, transformOrigin: '200px 470px' },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' },
          2,
        )
        .fromTo(
          '[data-part="bridge"]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          2.1,
        )
        .fromTo(
          '[data-checkpoint="2"]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4 },
          2.15,
        )
        .to('[data-checkpoint="2"]', { opacity: 0, y: -16, duration: 0.3 }, 2.85)

        .fromTo(
          '[data-part="peg"]',
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.06, ease: 'back.out(3)' },
          3,
        )
        .fromTo(
          '[data-checkpoint="3"]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4 },
          3.15,
        )
        .to('[data-checkpoint="3"]', { opacity: 0, y: -16, duration: 0.3 }, 3.85)

      STRINGS.forEach((s, i) => {
        tl.fromTo(
          `[data-string="${i}"]`,
          { strokeDashoffset: s.length },
          { strokeDashoffset: 0, duration: 0.5, ease: 'power1.inOut' },
          4 + i * 0.08,
        )
      })

      tl.fromTo(
        '[data-checkpoint="4"]',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4 },
        4.5,
      )
    }, wrapRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={wrapRef} className={reduced ? '' : 'relative'} style={reduced ? undefined : { height: '500vh' }}>
      <div className={reduced ? 'py-24' : 'sticky top-0 flex h-screen items-center justify-center overflow-hidden'}>
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-6 md:grid-cols-2 md:px-10">
          <svg
            viewBox="0 0 400 700"
            className="mx-auto h-[60vh] w-auto max-w-full md:h-[75vh]"
            role="img"
            aria-label="Ilustración de una guitarra montándose por piezas"
          >
            <path
              data-part="body"
              d="M200,360 C260,360 300,385 300,410 C300,440 250,455 255,480 C260,510 315,530 315,560 C315,600 270,650 250,660 C230,670 215,675 200,675 C185,675 170,670 150,660 C130,650 85,600 85,560 C85,530 140,510 145,480 C150,455 100,440 100,410 C100,385 140,360 200,360 Z"
              fill="#3a2418"
              stroke="rgba(245,243,239,0.12)"
              strokeWidth="2"
            />

            <g data-part="neck">
              <rect x="185" y="108" width="30" height="255" rx="3" fill="#241408" />
              <path d="M155,20 L245,20 L217,110 L183,110 Z" fill="#241408" stroke="rgba(245,243,239,0.12)" strokeWidth="2" />
              <rect x="183" y="105" width="34" height="7" rx="1.5" fill="#f5f3ef" />
            </g>

            <circle data-part="rosette" cx="200" cy="470" r="38" fill="#0a0a0b" stroke="#c8873f" strokeWidth="3" />
            <circle cx="200" cy="470" r="45" fill="none" stroke="rgba(245,243,239,0.15)" strokeWidth="1" />

            <g data-part="bridge">
              <rect x="155" y="552" width="90" height="16" rx="6" fill="#1a1109" stroke="rgba(245,243,239,0.12)" />
              <rect x="195" y="549" width="10" height="22" rx="2" fill="#f5f3ef" />
            </g>

            {STRINGS.map((s, i) => (
              <line
                key={i}
                data-string={i}
                x1={s.x1}
                y1={s.y1}
                x2={s.x2}
                y2={s.y2}
                stroke="#d8d2c4"
                strokeWidth="1.5"
                strokeDasharray={s.length}
              />
            ))}

            {PEGS.map((p, i) => (
              <circle key={i} data-part="peg" cx={p.cx} cy={p.cy} r="8" fill="#c8873f" stroke="#0a0a0b" strokeWidth="1.5" />
            ))}
          </svg>

          <div className="relative h-40 md:h-48">
            {taller.checkpoints.map((cp, i) =>
              reduced ? (
                <div key={cp.title} className={i > 0 ? 'mt-10' : ''}>
                  <h3 className="text-2xl font-semibold md:text-3xl">{cp.title}</h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-mute">{cp.body}</p>
                </div>
              ) : (
                <div key={cp.title} data-checkpoint={i} className="absolute inset-x-0 top-0 opacity-0">
                  <h3 className="text-2xl font-semibold md:text-3xl">{cp.title}</h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-mute">{cp.body}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
