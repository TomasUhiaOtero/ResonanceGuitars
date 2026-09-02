import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../hooks/useReducedMotion.js'

gsap.registerPlugin(ScrollTrigger)

export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reduced) {
      const ctx = gsap.context(() => {
        gsap.set(el, { opacity: 1, y: 0 })
      }, el)

      return () => ctx.revert()
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [delay, reduced])

  return (
    <Tag ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </Tag>
  )
}
