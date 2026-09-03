import Reveal from '../components/Reveal.jsx'
import HoverCarousel from '../components/HoverCarousel.jsx'
import GuitarCard from '../components/GuitarCard.jsx'
import { categories, guitars, featured } from '../data/catalog.js'

export default function Guitarras() {
  return (
    <main>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-36 md:px-10 md:pt-44">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-amber">Catálogo</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 max-w-[16ch] text-[clamp(2.75rem,7vw,6rem)]">
            Doce guitarras, cuatro familias
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-lg leading-relaxed text-mute">
            Cada modelo pasa por las mismas manos, del mismo taller. Pasa el
            cursor por una guitarra para ver su precio.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-28 md:px-10">
        <Reveal delay={0.15}>
          <HoverCarousel items={featured} />
        </Reveal>
      </section>

      {categories.map((category) => {
        const items = guitars.filter((g) => g.category === category.slug)

        return (
          <section
            key={category.slug}
            className="mx-auto max-w-[1400px] border-t border-white/10 px-6 py-24 md:px-10"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <Reveal>
                <h2 className="text-[clamp(2.25rem,5vw,3.75rem)]">{category.name}</h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="max-w-sm leading-relaxed text-mute md:text-right">
                  {category.description}
                </p>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((guitar, j) => (
                <Reveal key={guitar.id} delay={0.05 * j}>
                  <GuitarCard guitar={guitar} />
                </Reveal>
              ))}
            </div>
          </section>
        )
      })}
    </main>
  )
}
