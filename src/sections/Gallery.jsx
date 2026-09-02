import Reveal from '../components/Reveal.jsx'
import site from '../data/site.js'

const SPANS = [
  'md:col-span-2 md:row-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-1',
]

export default function Gallery() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10">
      <Reveal>
        <h2 className="text-[clamp(2.5rem,6vw,5rem)]">{site.gallery.title}</h2>
      </Reveal>

      <div className="mt-16 grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-4">
        {site.gallery.images.map((src, i) => (
          <Reveal
            key={src}
            as="figure"
            delay={i * 0.06}
            className={`group overflow-hidden rounded-2xl bg-surface ${SPANS[i] ?? 'md:col-span-1'}`}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
