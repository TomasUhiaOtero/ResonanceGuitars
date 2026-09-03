import { useEffect, useRef, useState } from 'react'

// Instancia <audio> sonando ahora mismo, compartida entre todas las
// tarjetas de la página — no es estado de React a propósito: solo un
// elemento puede sonar a la vez y no hace falta re-renderizar nada para
// llevar esa cuenta, basta con pausar la anterior antes de arrancar la
// siguiente.
let currentAudio = null

export default function useAudioPlayer(src) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio(src)
    audio.preload = 'none'
    audioRef.current = audio

    // El estado `playing` se sincroniza desde los eventos nativos del
    // audio, no desde el propio toggle: así, si otra tarjeta pausa este
    // audio desde fuera, este componente se entera igual.
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onPause)

    return () => {
      audio.pause()
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onPause)
      if (currentAudio === audio) currentAudio = null
    }
  }, [src])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      if (currentAudio && currentAudio !== audio) currentAudio.pause()
      currentAudio = audio
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }

  return { playing, toggle }
}
