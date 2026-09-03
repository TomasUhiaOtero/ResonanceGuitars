import { useState } from 'react'
import { categories } from '../data/catalog.js'

// Carrusel "expand on hover": en desktop todos los paneles arrancan a
// flex-1 y el que tiene el puntero (o el foco, para teclado) crece con
// flex-grow mientras el resto se encoge, revelando la ficha (categoría +
// precio) encima. flex-grow es una propiedad numérica animable por CSS,
// así que basta con una transición de `flex` — no hace falta JS para el
// movimiento en sí, solo para decidir qué panel está activo.
//
// En móvil no hay hover: la fila se convierte en scroll horizontal con
// snap y cada ficha va siempre visible (gating solo a partir de `md`).
export default function HoverCarousel({ items }) {
  const [activeId, setActiveId] = useState(null)

  return (
    <div
      className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:h-[560px] md:snap-none md:overflow-visible md:pb-0"
      onMouseLeave={() => setActiveId(null)}
    >
      {items.map((guitar) => {
        const active = activeId === guitar.id
        const category = categories.find((c) => c.slug === guitar.category)

        return (
          <article
            key={guitar.id}
            tabIndex={0}
            onMouseEnter={() => setActiveId(guitar.id)}
            onFocus={() => setActiveId(guitar.id)}
            onBlur={() => setActiveId(null)}
            style={{ flexGrow: active ? 4 : 1 }}
            className="relative h-[420px] w-[78vw] max-w-sm shrink-0 snap-center overflow-hidden rounded-3xl bg-surface outline-none transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:ring-2 focus-visible:ring-amber md:h-full md:w-auto md:max-w-none md:flex-1 md:basis-0"
          >
            <img
              src={guitar.image}
              alt={guitar.name}
              loading="lazy"
              decoding="async"
              className={`h-full w-full object-cover transition-transform duration-700 ease-out ${active ? 'md:scale-105' : ''}`}
            />

            {guitar.featured && (
              <span className="absolute left-3 top-3 rounded-full bg-[#b3341f] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#fdf1ec] shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                Destacado
              </span>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4">
              <p
                style={active ? { opacity: 1 } : undefined}
                className="whitespace-nowrap text-xs uppercase tracking-[0.25em] text-amber opacity-100 transition-opacity duration-300 md:opacity-0"
              >
                {category?.name}
              </p>
              <p className="mt-1 whitespace-nowrap text-lg font-semibold tracking-tight">
                {guitar.name}
              </p>
              <p
                style={active ? { opacity: 1 } : undefined}
                className="mt-1 whitespace-nowrap text-sm text-mute opacity-100 transition-opacity delay-100 duration-300 md:opacity-0"
              >
                {guitar.price}
              </p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
