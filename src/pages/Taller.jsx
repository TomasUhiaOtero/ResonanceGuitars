import Reveal from '../components/Reveal.jsx'
import GuitarAssembly from '../components/GuitarAssembly.jsx'
import taller from '../data/taller.js'
import site from '../data/site.js'

export default function Taller() {
  return (
    <main>
      <section className="mx-auto max-w-[1400px] px-6 pb-10 pt-36 md:px-10 md:pt-44">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-amber">{taller.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 max-w-[16ch] text-[clamp(2.75rem,7vw,6rem)]">{taller.title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-lg leading-relaxed text-mute">{taller.intro}</p>
        </Reveal>
      </section>

      <GuitarAssembly />

      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10">
        <Reveal>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)]">{taller.gallery.title}</h2>
        </Reveal>

        <div className="mt-16 grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-4">
          {site.gallery.images.map((src, i) => (
            <Reveal
              key={src}
              as="figure"
              delay={i * 0.06}
              className={`group overflow-hidden rounded-2xl bg-surface ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
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

      <section className="mx-auto max-w-[1400px] px-6 pb-28 md:px-10">
        <Reveal>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)]">{taller.video.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-md leading-relaxed text-mute">{taller.video.body}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <video
            controls
            preload="none"
            poster={taller.video.poster}
            className="mt-10 aspect-video w-full rounded-3xl bg-surface object-cover"
          >
            <source src={taller.video.src} type="video/mp4" />
          </video>
        </Reveal>
      </section>
    </main>
  )
}
