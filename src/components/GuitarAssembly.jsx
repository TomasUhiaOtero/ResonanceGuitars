import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../hooks/useReducedMotion.js'
import taller from '../data/taller.js'

gsap.registerPlugin(ScrollTrigger)

// Cuerdas: de la cejuela (y=112, dentro de la anchura del mástil) al
// puente (y=557, más abierto para que se vean por fuera del diapasón).
// Se generan por índice en vez de a mano — 6 pares de coordenadas menos
// que mantener sincronizados si algún día cambia el diseño.
const STRINGS = Array.from({ length: 6 }, (_, i) => {
  const x1 = 187.5 + i * 4.6
  const x2 = 163 + i * 14.8
  const y1 = 112
  const y2 = 557
  const length = Math.hypot(x2 - x1, y2 - y1)
  return { x1, y1, x2, y2, length }
})

const PEGS = [
  { cx: 142, cy: 45 },
  { cx: 142, cy: 72 },
  { cx: 142, cy: 99 },
  { cx: 258, cy: 45 },
  { cx: 258, cy: 72 },
  { cx: 258, cy: 99 },
]

// El mástil se estrecha hacia la cejuela (187–213 en y=112) y se abre
// hacia el cuerpo (182–218 en y=363). Trastes y diapasón interpolan
// entre esos dos bordes en vez de llevar coordenadas fijas, para que
// sigan la forma real del mástil.
const NUT_Y = 112
const HEEL_Y = 363
const edgeAt = (y) => {
  const t = (y - NUT_Y) / (HEEL_Y - NUT_Y)
  return { left: 187 + (182 - 187) * t, right: 213 + (218 - 213) * t }
}
const FRET_YS = [140, 168, 196, 224, 252, 280, 308, 336]
const INLAY_YS = [196, 280]

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
            style={{ filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.5))' }}
            role="img"
            aria-label="Ilustración de una guitarra acústica montándose por piezas"
          >
            <defs>
              <radialGradient id="gTop" cx="46%" cy="42%" r="70%">
                <stop offset="0%" stopColor="#f3d29b" />
                <stop offset="38%" stopColor="#d9a35e" />
                <stop offset="68%" stopColor="#93542a" />
                <stop offset="100%" stopColor="#341a0b" />
              </radialGradient>
              <linearGradient id="gNeck" x1="0" y1="0" x2="1" y2="0.2">
                <stop offset="0%" stopColor="#5c3b23" />
                <stop offset="55%" stopColor="#3d2413" />
                <stop offset="100%" stopColor="#26150a" />
              </linearGradient>
              <linearGradient id="gHead" x1="0" y1="0" x2="0.6" y2="1">
                <stop offset="0%" stopColor="#4e321e" />
                <stop offset="100%" stopColor="#231307" />
              </linearGradient>
              <linearGradient id="gFretboard" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1f130a" />
                <stop offset="100%" stopColor="#100a05" />
              </linearGradient>
              <radialGradient id="gTuner" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#f6f1e3" />
                <stop offset="100%" stopColor="#a99c7c" />
              </radialGradient>
              <radialGradient id="gShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0,0,0,0.55)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>

            <g data-part="body">
              <ellipse cx="200" cy="685" rx="145" ry="24" fill="url(#gShadow)" />

              <path
                d="M200,360 C260,360 300,385 300,410 C300,440 250,455 255,480 C260,510 315,530 315,560 C315,600 270,650 250,660 C230,670 215,675 200,675 C185,675 170,670 150,660 C130,650 85,600 85,560 C85,530 140,510 145,480 C150,455 100,440 100,410 C100,385 140,360 200,360 Z"
                fill="url(#gTop)"
                stroke="#201005"
                strokeWidth="2"
              />
              <path
                d="M200,360 C260,360 300,385 300,410 C300,440 250,455 255,480 C260,510 315,530 315,560 C315,600 270,650 250,660 C230,670 215,675 200,675 C185,675 170,670 150,660 C130,650 85,600 85,560 C85,530 140,510 145,480 C150,455 100,440 100,410 C100,385 140,360 200,360 Z"
                fill="none"
                stroke="rgba(245,243,239,0.35)"
                strokeWidth="1.5"
                transform="translate(200 470) scale(0.98) translate(-200 -470)"
              />

              <path
                d="M256,428 C278,436 284,472 271,500 C260,522 235,516 227,494 C220,474 234,438 256,428 Z"
                fill="#0c0805"
                opacity="0.88"
              />

              <circle cx="200" cy="672" r="4.5" fill="#c8873f" stroke="#201005" strokeWidth="1" />
            </g>

            <g data-part="neck">
              <path
                d="M182,363 L218,363 L213,110 L187,110 Z"
                fill="url(#gNeck)"
                stroke="#150c05"
                strokeWidth="1.5"
              />
              <path
                d="M184.5,360 L215.5,360 L210.5,112 L189.5,112 Z"
                fill="url(#gFretboard)"
              />

              {FRET_YS.map((y) => {
                const e = edgeAt(y)
                return (
                  <line
                    key={y}
                    x1={e.left + 1}
                    x2={e.right - 1}
                    y1={y}
                    y2={y}
                    stroke="rgba(245,243,239,0.4)"
                    strokeWidth="1"
                  />
                )
              })}
              {INLAY_YS.map((y) => (
                <circle key={y} cx="200" cy={y} r="3" fill="rgba(245,243,239,0.5)" />
              ))}

              <path
                d="M155,20 L245,20 L213,110 L187,110 Z"
                fill="url(#gHead)"
                stroke="#150c05"
                strokeWidth="1.5"
              />
              <path d="M200,38 L207,54 L200,70 L193,54 Z" fill="rgba(245,243,239,0.14)" />
              <rect x="187" y="105" width="26" height="7" rx="1.5" fill="#f5f3ef" />
            </g>

            <g data-part="rosette">
              <circle cx="200" cy="470" r="46" fill="none" stroke="#c8873f" strokeWidth="2" />
              <circle cx="200" cy="470" r="41" fill="none" stroke="#f5f3ef" strokeWidth="1.5" />
              <circle cx="200" cy="470" r="36" fill="none" stroke="#6b3d1a" strokeWidth="4" />
              <circle cx="200" cy="470" r="31" fill="#0a0a0b" />
            </g>

            <g data-part="bridge">
              <rect x="150" y="548" width="100" height="18" rx="8" fill="url(#gNeck)" stroke="#0d0805" strokeWidth="1" />
              <rect x="195" y="544" width="10" height="26" rx="2" fill="#f5f3ef" />
              {[160, 174, 188, 202, 216, 230].map((x) => (
                <circle key={x} cx={x} cy="557" r="3.2" fill="url(#gTuner)" stroke="#5a5040" strokeWidth="0.75" />
              ))}
            </g>

            {STRINGS.map((s, i) => (
              <line
                key={i}
                data-string={i}
                x1={s.x1}
                y1={s.y1}
                x2={s.x2}
                y2={s.y2}
                stroke="#ebe6d6"
                strokeWidth="1.3"
                strokeDasharray={s.length}
              />
            ))}

            {PEGS.map((p) => (
              <g key={`${p.cx}-${p.cy}`} data-part="peg">
                <ellipse cx={p.cx} cy={p.cy} rx="7.5" ry="9.5" fill="url(#gTuner)" stroke="#5a5040" strokeWidth="1" />
                <circle cx={p.cx} cy={p.cy} r="2.5" fill="#3a3428" />
              </g>
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
