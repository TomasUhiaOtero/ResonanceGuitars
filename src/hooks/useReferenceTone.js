import { useEffect, useRef, useState } from 'react'

// Mismo patrón singleton que useAudioPlayer (src/hooks/useAudioPlayer.js):
// solo una cuerda de referencia suena a la vez, así que basta con guardar
// "quién está sonando ahora" fuera de React y pararlo antes de arrancar
// el siguiente. Aquí el "audio" es un OscillatorNode generado en el
// momento, no un archivo — no hace falta precargar nada.
let currentStop = null

export default function useReferenceTone(freq) {
  const [playing, setPlaying] = useState(false)
  const stopRef = useRef(null)

  useEffect(() => {
    return () => {
      stopRef.current?.()
    }
  }, [])

  const toggle = () => {
    if (stopRef.current) {
      stopRef.current()
      return
    }

    currentStop?.()

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContextCtor()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.06)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()

    const stop = () => {
      gain.gain.cancelScheduledValues(ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.08)
      osc.stop(ctx.currentTime + 0.1)
      setTimeout(() => ctx.close().catch(() => {}), 150)
      setPlaying(false)
      stopRef.current = null
      if (currentStop === stop) currentStop = null
    }

    stopRef.current = stop
    currentStop = stop
    setPlaying(true)
  }

  return { playing, toggle }
}
