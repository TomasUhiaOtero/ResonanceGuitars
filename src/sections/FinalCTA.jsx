import Reveal from '../components/Reveal.jsx'
import site from '../data/site.js'

export default function FinalCTA() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-32 text-center md:px-10">
      <Reveal>
        <h2 className="mx-auto max-w-[12ch] text-[clamp(3rem,9vw,8rem)]">
          {site.cta.title}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mx-auto mt-8 max-w-md leading-relaxed text-mute">{site.cta.body}</p>
      </Reveal>
      <Reveal delay={0.2}>
        <a
          href="#"
          className="mt-10 inline-block rounded-full bg-bone px-8 py-4 text-sm font-medium text-ink transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-amber"
        >
          {site.cta.button}
        </a>
      </Reveal>
    </section>
  )
}
