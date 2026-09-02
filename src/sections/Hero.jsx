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

      <section ref={scope} id="top" className="relative h-screen overflow-hidden">
        <KenBurnsStack images={hero.slides} onReady={() => setReady(true)} />

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
          <p
            data-overline
            className="mb-6 text-xs uppercase tracking-[0.3em] text-amber opacity-0"
          >
            {hero.overline}
          </p>

          <h1 className="max-w-[16ch] text-[clamp(3rem,11vw,10rem)]">
            <SplitText text={hero.title} />
          </h1>

          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-md">
              <p data-body className="text-base leading-relaxed text-mute opacity-0">
                {hero.body}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  data-cta
                  href="#"
                  className="rounded-full bg-bone px-7 py-3.5 text-sm font-medium text-ink opacity-0 transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-amber"
                >
                  {hero.primaryCta}
                </a>
                <a
                  data-cta
                  href="#"
                  className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium opacity-0 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-amber"
                >
                  {hero.secondaryCta}
                </a>
              </div>

              <dl data-stats className="mt-12 flex gap-10 opacity-0">
                {hero.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-3xl font-semibold tracking-tight md:text-4xl">
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
              <img
                src={hero.card.image}
                alt={hero.card.name}
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
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
