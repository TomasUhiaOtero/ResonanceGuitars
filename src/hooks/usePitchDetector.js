import { useCallback, useEffect, useRef, useState } from 'react'
import autoCorrelate from '../utils/autoCorrelate.js'

// Escucha el micrófono y devuelve la frecuencia fundamental detectada en
// cada frame, vía Web Audio API (getUserMedia -> AnalyserNode ->
// autocorrelación) — nada de librerías externas. `frequency` es `null`
// tanto en silencio como en el frame antes de que el usuario dé permiso;
// quien consuma el hook no distingue esos dos casos porque a la UI le da
// igual el motivo, solo le importa si hay una nota que mostrar o no.
export default function usePitchDetector() {
  const [frequency, setFrequency] = useState(null)
  const [listening, setListening] = useState(false)
  const [error, setError] = useState(null)

  const audioCtxRef = useRef(null)
  const streamRef = useRef(null)
  const rafRef = useRef(null)
  const bufferRef = useRef(null)

  const stop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {})
    }
    audioCtxRef.current = null
    setListening(false)
    setFrequency(null)
  }, [])

  const start = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('unsupported')
      return
    }

    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      })
      streamRef.current = stream

      const AudioContextCtor = window.AudioContext || window.webkitAudioContext
      const audioCtx = new AudioContextCtor()
      audioCtxRef.current = audioCtx

      const source = audioCtx.createMediaStreamSource(stream)
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 2048
      source.connect(analyser)
      bufferRef.current = new Float32Array(analyser.fftSize)

      setListening(true)

      const tick = () => {
        analyser.getFloatTimeDomainData(bufferRef.current)
        setFrequency(autoCorrelate(bufferRef.current, audioCtx.sampleRate))
        rafRef.current = requestAnimationFrame(tick)
      }
      tick()
    } catch (err) {
      setError(err?.name === 'NotAllowedError' ? 'denied' : 'unsupported')
    }
  }, [])

  // Suelta el micrófono al desmontar (o al cambiar de página) — no hay
  // motivo para dejar el indicador de "grabando" del navegador encendido
  // fuera de esta sección.
  useEffect(() => () => stop(), [stop])

  return { start, stop, listening, frequency, error }
}
