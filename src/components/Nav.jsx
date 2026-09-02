import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import site from '../data/site.js'

gsap.registerPlugin(ScrollTrigger)

export default function Nav() {
  const ref = useRef(null)

  useEffect(() => {
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
  }, [])

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
        <a href="#top" className="px-4 text-sm font-semibold tracking-tight">
          {site.brand}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.links.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="rounded-full px-4 py-2 text-sm text-mute transition-colors hover:text-bone focus-visible:text-bone focus-visible:outline-2 focus-visible:outline-amber"
              >
                {link}
              </a>
            </li>
          ))}
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
