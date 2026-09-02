import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import useReducedMotion from '../hooks/useReducedMotion.js'

export default function Counter({ to, suffix = '', duration = 1.4, start = true }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reduced) {
      el.textContent = `${to}${suffix}`
      return
    }

    if (!start) {
      // Aun no toca contar: nos quedamos en cero para que la cuenta
      // empiece desde cero cuando llegue su momento.
      el.textContent = `0${suffix}`
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
