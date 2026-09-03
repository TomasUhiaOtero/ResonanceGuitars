import Reveal from '../components/Reveal.jsx'
import StringButton from '../components/StringButton.jsx'
import usePitchDetector from '../hooks/usePitchDetector.js'
import useReducedMotion from '../hooks/useReducedMotion.js'
import closestString from '../utils/closestString.js'
import strings from '../data/tuner.js'

const ERROR_COPY = {
  denied: 'Permiso de micrófono denegado. Actívalo en los ajustes del navegador para usar la escucha automática — mientras tanto puedes seguir afinando de oído con los botones de abajo.',
  unsupported: 'Este navegador no permite escuchar el micrófono aquí. Afina de oído con los botones de abajo.',
}

export default function Tuner() {
  const reduced = useReducedMotion()
  const { start, stop, listening, frequency, error } = usePitchDetector()
  const match = closestString(frequency, strings)

  const cents = match?.cents ?? 0
  const clamped = Math.max(-50, Math.min(50, cents))
  const needlePercent = ((clamped + 50) / 100) * 100
  const diff = Math.abs(cents)
  const inTune = match && diff <= 5

  const toneColor = !match ? 'text-mute' : inTune ? 'text-emerald-400' : diff <= 15 ? 'text-amber' : 'text-rose-400'
  const barColor = !match ? 'bg-white/20' : inTune ? 'bg-emerald-400' : diff <= 15 ? 'bg-amber' : 'bg-rose-400'

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-amber">Afinador</p>
        <h2 className="mt-4 max-w-[16ch] text-[clamp(2.5rem,6vw,5rem)]">
          Escucha antes de tocar
        </h2>
        <p className="mt-6 max-w-lg leading-relaxed text-mute">
          Activa el micrófono y toca una cuerda: te decimos cuál es y cuánto le falta. O
          dale al play de cada cuerda y afina de oído, sin más.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-14 grid gap-10 rounded-3xl border border-white/10 bg-surface p-8 md:p-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {!listening ? (
              <>
                <button
                  type="button"
                  onClick={start}
                  className="rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-amber"
                >
                  Activar micrófono
                </button>
                {error && <p className="mt-5 max-w-sm text-sm text-mute">{ERROR_COPY[error]}</p>}
              </>
            ) : (
              <>
                <div className={`text-[clamp(3.5rem,8vw,6rem)] font-semibold leading-none tracking-tight ${toneColor}`}>
                  {match ? match.string.id[0] : '–'}
                </div>
                <p className="mt-2 text-sm text-mute">
                  {match ? `${match.string.label} · ${frequency.toFixed(1)} Hz` : 'Toca una cuerda…'}
                </p>

                <div className="mt-8 w-full max-w-sm">
                  <div className="relative h-2 rounded-full bg-white/10">
                    <div className="absolute inset-y-0 left-1/2 w-px bg-white/30" />
                    <div
                      className={`absolute top-1/2 h-4 w-1.5 -translate-y-1/2 -translate-x-1/2 rounded-full ${barColor} ${
                        reduced ? '' : 'transition-[left] duration-150 ease-out'
                      }`}
                      style={{ left: `${needlePercent}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.15em] text-mute">
                    <span>−50¢</span>
                    <span>afinada</span>
                    <span>+50¢</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={stop}
                  className="mt-8 rounded-full border border-white/15 px-5 py-2 text-sm text-mute transition-colors hover:text-bone focus-visible:outline-2 focus-visible:outline-amber"
                >
                  Desactivar micrófono
                </button>
              </>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-3">
            {strings.map((string) => (
              <StringButton key={string.id} string={string} active={match?.string.id === string.id} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
