import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import site from '../data/site.js'
import useReducedMotion from '../hooks/useReducedMotion.js'

gsap.registerPlugin(ScrollTrigger)

// Rutas reales para los links de nav que ya tienen página propia. El resto
// se queda como ancla de la home (fuera del alcance de este cambio).
const ROUTES = {
  Guitarras: '/guitarras',
  Afinador: '/afinador',
  Taller: '/taller',
  Soporte: '/soporte',
}

export default function Nav() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { pathname } = useLocation()

  useEffect(() => {
    // Nav vive fuera de <Routes>, así que solo monta una vez en la vida de
    // la app (no se remonta al navegar): esta entrada se ve una sola vez,
    // sea cual sea la página en la que aterrice la visita.
    if (reduced) {
      gsap.set('[data-nav]', { opacity: 1 })
      return
    }

    let timeoutId
    const fontsSettled = Promise.race([
      document.fonts.ready.catch(() => {}),
      new Promise((resolve) => {
        timeoutId = setTimeout(resolve, 1500)
      }),
    ])

    let ctx
    fontsSettled.then(() => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          '[data-nav]',
          { y: -24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.2 },
        )
      })
    })

    return () => {
      clearTimeout(timeoutId)
      ctx?.revert()
    }
  }, [reduced])

  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      // Al bajar, la píldora se encoge y se oscurece.
      gsap.to('[data-pill]', {
        scale: 0.96,
        backgroundColor: 'rgba(10,10,11,0.72)',
        ease: 'none',
        scrollTrigger: { start: 100, end: 240, scrub: true },
      })
    }, ref)

    // ctx.revert() mata solo los triggers creados aquí dentro. No usar
    // ScrollTrigger.getAll() en el cleanup: mataría los de otras secciones.
    return () => ctx.revert()
  }, [reduced])

  return (
    <header
      ref={ref}
      data-nav
      className="fixed inset-x-0 top-5 z-40 flex justify-center px-4 opacity-0"
    >
      <nav
        data-pill
        className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-xl"
      >
        <Link to="/" className="px-4 text-sm font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-amber">
          {site.brand}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.links.map((link) => {
            const to = ROUTES[link]
            const active = to && pathname === to

            if (to) {
              return (
                <li key={link}>
                  <Link
                    to={to}
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-full px-4 py-2 text-sm transition-colors focus-visible:text-bone focus-visible:outline-2 focus-visible:outline-amber ${
                      active ? 'text-bone' : 'text-mute hover:text-bone'
                    }`}
                  >
                    {link}
                  </Link>
                </li>
              )
            }

            return (
              <li key={link}>
                <a
                  href="#"
                  className="rounded-full px-4 py-2 text-sm text-mute transition-colors hover:text-bone focus-visible:text-bone focus-visible:outline-2 focus-visible:outline-amber"
                >
                  {link}
                </a>
              </li>
            )
          })}
        </ul>

        <a
          href="#"
          className="rounded-full bg-bone px-5 py-2 text-sm font-medium text-ink transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-amber"
        >
          {site.nav.cta}
        </a>
      </nav>
    </header>
  )
}
