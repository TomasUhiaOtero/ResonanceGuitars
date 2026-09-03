import Reveal from '../components/Reveal.jsx'
import GuitarAssembly from '../components/GuitarAssembly.jsx'
import useReducedMotion from '../hooks/useReducedMotion.js'
import taller from '../data/taller.js'
import site from '../data/site.js'

export default function Taller() {
  const reduced = useReducedMotion()

  return (
    <main>
      <section className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col justify-center px-6 pb-10 pt-36 md:px-10 md:pt-44">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-amber">{taller.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 max-w-[16ch] text-[clamp(2.75rem,7vw,6rem)]">{taller.title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-lg leading-relaxed text-mute">{taller.intro}</p>
        </Reveal>

        {/*
          animate-bounce es una utilidad estándar de Tailwind (@keyframes
          bounce): la regla global en index.css ya neutraliza animation-duration
          con prefers-reduced-motion, así que este indicador no necesita
          lógica de reduced motion aparte — queda estático solo.
        */}
        <Reveal delay={0.25}>
          <div className="mt-16 flex flex-col items-center gap-2 text-mute">
            <span className="text-xs uppercase tracking-[0.2em]">Desliza para montarla</span>
            <svg
              className="h-5 w-5 animate-bounce text-amber"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 4v16m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
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
          {/*
            Autoplay de vídeo solo funciona muted (política de todos los
            navegadores) — por eso muted va siempre, se oiga o no. Con
            reduced motion no arranca solo: se deja pausado en el poster,
            controles visibles, a que el usuario decida.
          */}
          <video
            autoPlay={!reduced}
            loop={!reduced}
            muted
            playsInline
            controls
            preload={reduced ? 'none' : 'auto'}
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
