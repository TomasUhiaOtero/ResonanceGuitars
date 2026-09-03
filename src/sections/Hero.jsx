import { useRef, useState } from 'react'
import KenBurnsStack from '../components/KenBurnsStack.jsx'
import SplitText from '../components/SplitText.jsx'
import Counter from '../components/Counter.jsx'
import useIntroTimeline from '../hooks/useIntroTimeline.js'
import site from '../data/site.js'

export default function Hero() {
  const scope = useRef(null)
  const [ready, setReady] = useState(false)
  const { done } = useIntroTimeline({ scope, ready })
  const { hero } = site

  return (
    <>
      <div
        data-curtain
        className="fixed inset-0 z-50 bg-ink"
        aria-hidden="true"
      />

      <section ref={scope} id="top" className="relative min-h-screen overflow-hidden">
        <KenBurnsStack images={hero.slides} onReady={() => setReady(true)} />

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/20 to-transparent" />
        <div className="absolute inset-0 bg-ink/10" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col justify-end px-6 pb-14 pt-32 md:px-10 md:pb-20">
          <p
            data-overline
            className="mb-6 text-xs uppercase tracking-[0.3em] text-amber opacity-0"
          >
            {hero.overline}
          </p>

          <h1 className="max-w-[16ch] text-[clamp(2.75rem,8vw,7.5rem)]">
            <SplitText text={hero.title} />
          </h1>

          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-md">
              <p data-body className="text-base leading-relaxed text-mute opacity-0">
                {hero.body}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {/*
                  El timeline de entrada anima el elemento [data-cta] y le
                  deja un "transform: none" puesto por inline style, que
                  ganaría a cualquier transform de hover puesto directamente
                  en el <a>. Por eso el relleno de color vive en <span>
                  decorativos aparte (capas apiladas con overflow-hidden +
                  rounded-full de por medio para que se recorten a la forma
                  de la píldora); el texto no se mueve, solo cambia lo que
                  hay debajo.
                */}
                <a
                  data-cta
                  href="#"
                  className="group relative overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium text-ink opacity-0 shadow-[0_0_0_0_rgba(200,135,63,0)] transition-shadow duration-300 ease-out hover:shadow-[0_16px_36px_-14px_rgba(200,135,63,0.55)] active:shadow-[0_6px_16px_-10px_rgba(200,135,63,0.45)] focus-visible:outline-2 focus-visible:outline-amber"
                >
                  <span aria-hidden="true" className="absolute inset-0 bg-bone" />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-left scale-x-0 bg-amber transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
                  />
                  <span className="relative">{hero.primaryCta}</span>
                </a>
                <a
                  data-cta
                  href="#"
                  className="group relative overflow-hidden rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium opacity-0 transition-[border-color,box-shadow] duration-300 ease-out hover:border-white/40 hover:shadow-[0_16px_36px_-16px_rgba(200,135,63,0.4)] focus-visible:outline-2 focus-visible:outline-amber"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 aspect-square w-[220%] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-amber/25 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-100"
                  />
                  <span className="relative">{hero.secondaryCta}</span>
                </a>
              </div>

              <dl data-stats className="mt-10 flex flex-wrap gap-x-8 gap-y-6 opacity-0">
                {hero.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="whitespace-nowrap text-3xl font-semibold tracking-tight md:text-4xl">
                      <Counter to={stat.value} suffix={stat.suffix} start={done} />
                    </dt>
                    <dd className="mt-1 text-xs text-mute">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <article
              data-card
              className="w-full max-w-xs rounded-2xl border border-white/10 bg-white/5 p-3 opacity-0 backdrop-blur-xl"
            >
              <div className="relative">
                <img
                  src={hero.card.image}
                  alt={hero.card.name}
                  className="aspect-[4/3] w-full rounded-xl object-cover"
                />
                {hero.card.tag && (
                  <span className="absolute left-2 top-2 rounded-full bg-[#b3341f] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#fdf1ec] shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                    {hero.card.tag}
                  </span>
                )}
              </div>
              <div className="flex items-end justify-between px-2 py-3">
                <div>
                  <h2 className="text-sm font-semibold">{hero.card.name}</h2>
                  <p className="mt-0.5 text-xs text-mute">{hero.card.note}</p>
                </div>
                <p className="text-sm font-medium text-amber">{hero.card.price}</p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
