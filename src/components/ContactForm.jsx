import { useState } from 'react'

const fieldClass =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-bone placeholder:text-mute/70 outline-none transition-colors focus:border-amber/60 focus-visible:outline-2 focus-visible:outline-amber'

// Sin backend: es una landing de demostración. El "envío" simula la espera
// de red que tendría un formulario real y pasa a un estado de éxito — así
// se puede evaluar el flujo completo sin montar un servidor solo para esto.
export default function ContactForm({ categories, subject, onSubjectChange, success }) {
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [order, setOrder] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 700)
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber/15">
          <svg viewBox="0 0 24 24" fill="none" stroke="#c8873f" strokeWidth="2.5" className="h-6 w-6" aria-hidden="true">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 text-xl font-semibold">{success.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-mute">{success.body}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-mute">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-mute">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-mute">
            Motivo
          </label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className={`${fieldClass} appearance-none`}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id} className="bg-surface">
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="order" className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-mute">
            Nº de pedido <span className="normal-case text-mute/60">(opcional)</span>
          </label>
          <input
            id="order"
            type="text"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            placeholder="RES-00000"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-mute">
          Mensaje
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Cuéntanos qué necesitas"
          className={`${fieldClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-full bg-bone px-6 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-amber disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
      </button>
    </form>
  )
}
