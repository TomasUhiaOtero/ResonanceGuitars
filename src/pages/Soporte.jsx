import { useRef, useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import Accordion from '../components/Accordion.jsx'
import ContactForm from '../components/ContactForm.jsx'
import soporte from '../data/soporte.js'

export default function Soporte() {
  const [subject, setSubject] = useState(soporte.categories[0].id)
  const formRef = useRef(null)

  const selectCategory = (id) => {
    setSubject(id)
    // Sin `behavior: 'smooth'`: Lenis gestiona el scroll suave del sitio
    // a través de wheel/touch, y un scrollIntoView suave nativo lanzado
    // fuera de ese flujo no llega a moverse en este proyecto — un salto
    // instantáneo es fiable en cualquier caso.
    formRef.current?.scrollIntoView({ block: 'start' })
  }

  return (
    <main>
      <section className="mx-auto max-w-[1400px] px-6 pb-10 pt-36 md:px-10 md:pt-44">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-amber">{soporte.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 max-w-[18ch] text-[clamp(2.75rem,7vw,6rem)]">{soporte.title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-lg leading-relaxed text-mute">{soporte.intro}</p>
        </Reveal>
      </section>

      {/*
        Patrón "motivo de consulta primero" (Thomann): elegir categoría
        preselecciona el desplegable del formulario y baja hasta él, en
        vez de hacer que la rellenes a ciegas.
      */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {soporte.categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05}>
              <button
                type="button"
                onClick={() => selectCategory(c.id)}
                className={`h-full w-full rounded-2xl border p-6 text-left transition-colors focus-visible:outline-2 focus-visible:outline-amber ${
                  subject === c.id
                    ? 'border-amber/50 bg-amber/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <h3 className="text-base font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{c.body}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <Reveal>
          <h2 className="text-[clamp(2.25rem,5vw,3.75rem)]">Preguntas frecuentes</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10">
            <Accordion items={soporte.faqs} />
          </div>
        </Reveal>
      </section>

      <section ref={formRef} className="mx-auto max-w-[1400px] scroll-mt-28 px-6 py-24 md:px-10">
        <Reveal>
          <h2 className="text-[clamp(2.25rem,5vw,3.75rem)]">Escríbenos</h2>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          <Reveal delay={0.08}>
            <ContactForm
              categories={soporte.categories}
              subject={subject}
              onSubjectChange={setSubject}
              success={soporte.form.success}
            />
          </Reveal>

          <Reveal delay={0.14}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-mute">
                Otras formas de contactar
              </h3>
              <dl className="mt-5 space-y-5 text-sm">
                <div>
                  <dt className="text-mute">Teléfono</dt>
                  <dd className="mt-1 font-medium">{soporte.contact.phone}</dd>
                </div>
                <div>
                  <dt className="text-mute">Email</dt>
                  <dd className="mt-1 font-medium">{soporte.contact.email}</dd>
                </div>
                <div>
                  <dt className="text-mute">Horario</dt>
                  <dd className="mt-1 font-medium">{soporte.contact.hours}</dd>
                </div>
                <div>
                  <dt className="text-mute">Taller</dt>
                  <dd className="mt-1 font-medium">{soporte.contact.address}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
