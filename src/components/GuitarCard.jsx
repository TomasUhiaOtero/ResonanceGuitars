import PlayButton from './PlayButton.jsx'

export default function GuitarCard({ guitar }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={guitar.image}
          alt={guitar.name}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {guitar.featured && (
          <span className="absolute left-2 top-2 rounded-full bg-[#b3341f] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#fdf1ec] shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
            Destacado
          </span>
        )}
        {guitar.audio && (
          <PlayButton src={guitar.audio} label={guitar.name} className="absolute right-2 top-2" />
        )}
      </div>

      <div className="px-2 py-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold">{guitar.name}</h3>
          <p className="whitespace-nowrap text-sm font-medium text-amber">{guitar.price}</p>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-mute">{guitar.note}</p>
      </div>
    </article>
  )
}
