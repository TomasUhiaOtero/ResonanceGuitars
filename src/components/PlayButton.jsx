import useAudioPlayer from '../hooks/useAudioPlayer.js'

// Botón circular de play/pausa para escuchar cómo suena una guitarra.
// `stopPropagation` porque vive dentro de tarjetas que ya reaccionan al
// hover/focus (el carousel, sobre todo) — un clic aquí no debe disparar
// nada de eso.
export default function PlayButton({ src, label, className = '' }) {
  const { playing, toggle } = useAudioPlayer(src)

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle()
      }}
      aria-label={playing ? `Pausar ${label}` : `Escuchar ${label}`}
      aria-pressed={playing}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/70 text-bone backdrop-blur-sm transition-colors hover:bg-amber hover:text-ink focus-visible:outline-2 focus-visible:outline-amber ${
        playing ? 'bg-amber text-ink' : ''
      } ${className}`}
    >
      {playing ? (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3.5 w-3.5" aria-hidden="true">
          <path d="M7 4.5v15l13-7.5-13-7.5Z" />
        </svg>
      )}
    </button>
  )
}
