// <details>/<summary> nativos: teclado y lectores de pantalla gratis, y
// sin la clase de bugs de "medir scrollHeight de contenido dentro de un
// contenedor con max-height/overflow todavía colapsado" — en este
// entorno esa medición devolvía 0 de forma consistente (confirmado con
// tanto el truco grid-rows 0fr→1fr como max-height + scrollHeight, los
// dos fallando igual), así que mejor no depender de ella. La apertura no
// anima el alto — sí funciona, y no vale la pena perseguir esa animación
// sacrificando fiabilidad.
export default function Accordion({ items }) {
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item) => (
        <details key={item.q} className="group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left focus-visible:outline-2 focus-visible:outline-amber [&::-webkit-details-marker]:hidden">
            <span className="text-base font-medium md:text-lg">{item.q}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-mute transition-transform duration-300 group-open:rotate-45"
            >
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </summary>
          <p className="max-w-2xl pt-4 leading-relaxed text-mute">{item.a}</p>
        </details>
      ))}
    </div>
  )
}
