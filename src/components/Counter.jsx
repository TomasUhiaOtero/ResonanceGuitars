import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import useReducedMotion from '../hooks/useReducedMotion.js'

export default function Counter({ to, suffix = '', duration = 1.4, start = true }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!start || reduced) {
      el.textContent = `${to}${suffix}`
      return
    }

    const obj = { n: 0 }
    const tween = gsap.to(obj, {
      n: to,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${Math.round(obj.n)}${suffix}`
      },
    })

    return () => tween.kill()
  }, [to, suffix, duration, start, reduced])

  return <span ref={ref}>0{suffix}</span>
}
