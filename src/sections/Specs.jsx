import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import Reveal from '../components/Reveal.jsx'
import Counter from '../components/Counter.jsx'
import site from '../data/site.js'

gsap.registerPlugin(ScrollTrigger)

export default function Specs() {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 75%',
      once: true,
      onEnter: () => setStarted(true),
    })
    return () => st.kill()
  }, [])

  return (
    <section ref={ref} className="border-y border-white/10 bg-surface">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10">
        <Reveal>
          <h2 className="max-w-[16ch] text-[clamp(2.5rem,6vw,5rem)]">
            {site.specs.title}
          </h2>
        </Reveal>

        <dl className="mt-20 grid grid-cols-2 gap-12 lg:grid-cols-4">
          {site.specs.items.map((item, i) => (
            <Reveal key={item.label} as="div" delay={i * 0.08}>
              <dt className="text-[clamp(3rem,7vw,6rem)] font-semibold tracking-tight">
                <Counter to={item.value} suffix={item.suffix} start={started} />
              </dt>
              <dd className="mt-2 text-sm text-mute">{item.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
