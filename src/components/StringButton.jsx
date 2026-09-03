import useReferenceTone from '../hooks/useReferenceTone.js'

// Una cuerda de la afinación estándar: al pulsar suena su nota de
// referencia (para afinar de oído, como el modo "reproducir nota" de
// GuitarTuna), y se resalta en ámbar cuando el micrófono detecta que es
// la cuerda más cercana a lo que está sonando ahora mismo.
export default function StringButton({ string, active }) {
  const { playing, toggle } = useReferenceTone(string.freq)

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      className={`flex flex-col items-center gap-2 rounded-2xl border px-4 py-5 transition-colors focus-visible:outline-2 focus-visible:outline-amber ${
        playing
          ? 'border-amber bg-amber/10'
          : active
            ? 'border-amber/50 bg-white/5'
            : 'border-white/10 bg-white/5 hover:border-white/20'
      }`}
    >
      <span className="text-2xl font-semibold tracking-tight">{string.id[0]}</span>
      <span className="text-xs text-mute">{string.label}</span>
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={`h-3 w-3 ${playing ? 'text-amber' : 'text-mute'}`}
      >
        {playing ? (
          <>
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </>
        ) : (
          <path d="M7 4.5v15l13-7.5-13-7.5Z" />
        )}
      </svg>
    </button>
  )
}
