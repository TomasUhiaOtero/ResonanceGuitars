import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from '../components/Reveal.jsx'
import useReducedMotion from '../hooks/useReducedMotion.js'
import site from '../data/site.js'

gsap.registerPlugin(ScrollTrigger)

export default function Showcase() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray('[data-shot]')
      const panels = gsap.utils.toArray('[data-panel]')
      // Con reduced motion no hay fundido, pero la imagen correcta
      // tiene que seguir cambiando: si no, se ve siempre la ultima.
      const d = reduced ? 0 : 0.5

      gsap.set(images, { opacity: 0 })
      gsap.set(images[0], { opacity: 1 })

      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 60%',
          end: 'bottom 60%',
          onToggle: (self) => {
            if (!self.isActive) return
            gsap.to(images, { opacity: 0, duration: d, ease: 'power2.inOut' })
            gsap.to(images[i], { opacity: 1, duration: d, ease: 'power2.inOut' })
          },
        })
      })
    }, ref)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={ref} className="mx-auto max-w-[1400px] px-6 py-28 md:px-10">
      <Reveal>
        <h2 className="max-w-[14ch] text-[clamp(2.5rem,6vw,5rem)]">
          Tres formas de sonar
        </h2>
      </Reveal>

      <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="hidden lg:block">
          <div className="sticky top-24 aspect-[4/5] overflow-hidden rounded-3xl bg-surface">
            {site.products.map((product) => (
              <img
                key={product.id}
                data-shot
                src={product.image}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover opacity-0"
              />
            ))}
          </div>
        </div>

        <div>
          {site.products.map((product) => (
            <article
              key={product.id}
              data-panel
              className="border-b border-white/10 py-14 first:pt-0 last:border-0"
            >
              <img
                src={product.image}
                alt={product.name}
                className="mb-8 aspect-[4/3] w-full rounded-2xl object-cover lg:hidden"
              />
              <p className="text-xs uppercase tracking-[0.3em] text-amber">
                {product.eyebrow}
              </p>
              <h3 className="mt-4 text-4xl md:text-5xl">{product.name}</h3>
              <p className="mt-5 max-w-md leading-relaxed text-mute">{product.body}</p>
              <p className="mt-8 text-lg font-medium">{product.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
