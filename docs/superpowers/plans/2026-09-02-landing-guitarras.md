# Landing "Resonance" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir una landing page de una sola página para una tienda de guitarras premium, con estética Apple, entrada animada al cargar y un hero cuyo fondo se mueve en bucle infinito como si fuera vídeo.

**Architecture:** SPA estática sin router ni backend. `App.jsx` monta Lenis (scroll suave) y apila secciones autocontenidas que leen su contenido de un único archivo de datos. Dos motores de animación independientes: `KenBurnsStack` (bucle infinito del hero) y `useIntroTimeline` (secuencia de entrada única al cargar). El resto de secciones comparten un único wrapper `Reveal` basado en ScrollTrigger.

**Tech Stack:** Vite · React 19 (JSX) · Tailwind CSS v4 · GSAP 3 + ScrollTrigger · Lenis

**Spec:** `docs/superpowers/specs/2026-09-02-landing-guitarras-design.md`

## Global Constraints

- Node 18+ y npm. Todo el trabajo ocurre en `C:\Users\tomas\Desktop\prueba hero claude`.
- Sin TypeScript. Archivos `.jsx` y `.js`.
- Sin librerías de UI (nada de shadcn, MUI, daisyUI). Solo Tailwind.
- Dependencias de runtime permitidas, exactamente estas: `react`, `react-dom`, `gsap`, `lenis`.
- Todo el texto visible y todas las URLs de imagen viven en `src/data/site.js`. Ningún componente contiene copy hardcodeado.
- Marca: **Resonance**. Idioma del copy: español.
- Paleta (definida como tokens en `src/styles/index.css`):
  `--color-ink: #0a0a0b` · `--color-surface: #121214` · `--color-bone: #f5f3ef` · `--color-amber: #c8873f` · `--color-mute: #8a8a90`
- Tipografía: `Inter` (Google Fonts), pesos 400/500/600, `letter-spacing: -0.03em` en titulares.
- Toda animación debe estar dentro de un `gsap.context()` y limpiarse en el cleanup del `useEffect`.
- Toda capa animada debe estar desactivada bajo `prefers-reduced-motion: reduce`.
- No hay tests unitarios. Cada tarea se verifica con `npm run build` y con observación en el navegador. Los pasos de verificación son obligatorios, no opcionales.
- Commit al final de cada tarea, mensaje en formato `feat: ...` / `chore: ...` / `style: ...`.

---

### Task 1: Scaffold del proyecto

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `.gitignore`
- Create: `src/main.jsx`, `src/App.jsx`, `src/styles/index.css`
- Delete: `src/App.css`, `src/assets/`, `public/vite.svg` (basura de la plantilla)

**Interfaces:**
- Consumes: nada.
- Produces: proyecto Vite arrancable con Tailwind v4 activo, GSAP y Lenis instalados, y repo git inicializado.

- [ ] **Step 1: Inicializar git y el proyecto Vite**

```bash
git init
npm create vite@latest . -- --template react
```

Si Vite avisa de que el directorio no está vacío, elegir "Ignore files and continue" (existe la carpeta `docs/`).

- [ ] **Step 2: Instalar dependencias**

```bash
npm install && npm install tailwindcss @tailwindcss/vite gsap lenis
```

- [ ] **Step 3: Activar Tailwind en Vite**

Sustituir el contenido de `vite.config.js` por:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 4: Escribir los estilos base y los tokens**

Crear `src/styles/index.css` con exactamente:

```css
@import "tailwindcss";

@theme {
  --color-ink: #0a0a0b;
  --color-surface: #121214;
  --color-bone: #f5f3ef;
  --color-amber: #c8873f;
  --color-mute: #8a8a90;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}

html {
  background-color: var(--color-ink);
}

body {
  margin: 0;
  background-color: var(--color-ink);
  color: var(--color-bone);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

h1, h2, h3 {
  letter-spacing: -0.03em;
  line-height: 0.95;
  font-weight: 600;
  margin: 0;
}

::selection {
  background: var(--color-amber);
  color: var(--color-ink);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Borrar `src/App.css` y `src/index.css` si existen, y la carpeta `src/assets/`.

- [ ] **Step 5: Cablear el entrypoint**

`src/main.jsx`:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

`src/App.jsx` (provisional, se irá rellenando):

```jsx
export default function App() {
  return (
    <main className="min-h-screen grid place-items-center">
      <h1 className="text-6xl">Resonance</h1>
    </main>
  )
}
```

- [ ] **Step 6: Cargar la fuente en `index.html`**

Dentro de `<head>`, antes del `<title>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
```

Cambiar el `<title>` a `Resonance — Guitarras hechas a mano` y el `<html lang="en">` a `lang="es"`.

- [ ] **Step 7: Verificar el build**

```bash
npm run build
```

Expected: termina con `built in ...`, sin errores.

- [ ] **Step 8: Verificar en el navegador**

Arrancar `npm run dev` y abrir la URL. Expected: fondo casi negro, texto color hueso "Resonance" centrado con la fuente Inter. Si el fondo es blanco, Tailwind no se está aplicando — revisar el Step 3.

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "chore: scaffold vite + react + tailwind v4 + gsap + lenis"
```

---

### Task 2: Assets del hero y archivo de contenido

**Files:**
- Create: `public/hero/01.jpg` … `public/hero/04.jpg`
- Create: `public/products/01.jpg` … `public/products/03.jpg`
- Create: `public/gallery/01.jpg` … `public/gallery/05.jpg`
- Create: `src/data/site.js`

**Interfaces:**
- Consumes: nada.
- Produces: `site` — objeto exportado por defecto desde `src/data/site.js` con las claves `nav`, `hero`, `series`, `products`, `specs`, `gallery`, `cta`, `footer`. Todas las tareas siguientes leen de aquí.

- [ ] **Step 1: Descargar las imágenes**

Doce imágenes en total. Usar `loremflickr`, que devuelve fotos reales del tema pedido y es determinista gracias al parámetro `lock`:

```bash
mkdir -p public/hero public/products public/gallery
for i in 1 2 3 4; do curl -fsSL "https://loremflickr.com/1920/1280/electric-guitar,guitar/all?lock=$i" -o "public/hero/0$i.jpg"; done
for i in 1 2 3; do curl -fsSL "https://loremflickr.com/1200/1500/acoustic-guitar/all?lock=1$i" -o "public/products/0$i.jpg"; done
for i in 1 2 3 4 5; do curl -fsSL "https://loremflickr.com/1200/900/luthier,guitar-workshop/all?lock=2$i" -o "public/gallery/0$i.jpg"; done
```

- [ ] **Step 2: Verificar que las descargas son imágenes reales**

```bash
ls -l public/hero public/products public/gallery
```

Expected: los doce archivos existen y ninguno pesa menos de 20 KB. Un archivo de 0-2 KB es una página de error disfrazada de jpg: en ese caso, volver a descargarlo con otro `lock`.

- [ ] **Step 3: Escribir `src/data/site.js`**

```js
const site = {
  brand: 'Resonance',

  nav: {
    links: ['Guitarras', 'Series', 'Taller', 'Soporte'],
    cta: 'Comprar',
  },

  hero: {
    overline: 'Serie 2026',
    title: 'El silencio\nantes del\nprimer acorde',
    body: 'Doce meses de secado, ochenta y tres piezas y una sola persona firmando cada instrumento. Guitarras construidas para durar más que quien las toca.',
    primaryCta: 'Descubrir la colección',
    secondaryCta: 'Ver el taller',
    slides: ['/hero/01.jpg', '/hero/02.jpg', '/hero/03.jpg', '/hero/04.jpg'],
    stats: [
      { value: 83, suffix: '', label: 'Piezas por guitarra' },
      { value: 240, suffix: 'h', label: 'De trabajo manual' },
      { value: 12, suffix: ' años', label: 'De garantía' },
    ],
    card: {
      image: '/products/01.jpg',
      name: 'Aurora Custom',
      note: 'Tapa de abeto alpino, 2026',
      price: '4.290 €',
    },
  },

  series: ['Aurora', 'Basalt', 'Vela', 'Nocturne', 'Cedar', 'Meridian'],

  products: [
    {
      id: 'aurora',
      eyebrow: 'Eléctrica',
      name: 'Aurora',
      body: 'Cuerpo hueco de aliso y pastillas bobinadas a mano. Suena limpia a bajo volumen y se rompe con elegancia cuando aprietas.',
      image: '/products/01.jpg',
      price: '4.290 €',
    },
    {
      id: 'basalt',
      eyebrow: 'Acústica',
      name: 'Basalt',
      body: 'Palosanto de la India y tapa de abeto Sitka. Grave profundo, agudos que no cortan. Pensada para grabar sin ecualizar.',
      image: '/products/02.jpg',
      price: '3.750 €',
    },
    {
      id: 'vela',
      eyebrow: 'Clásica',
      name: 'Vela',
      body: 'Cedro macizo, abanico tradicional de siete varetas y un mástil que desaparece bajo la mano. La más silenciosa de tocar.',
      image: '/products/03.jpg',
      price: '5.100 €',
    },
  ],

  specs: {
    title: 'Números que no se ven en la foto',
    items: [
      { value: 83, suffix: '', label: 'Piezas de madera' },
      { value: 240, suffix: 'h', label: 'Horas de lutier' },
      { value: 12, suffix: '', label: 'Maderas distintas' },
      { value: 12, suffix: ' años', label: 'De garantía' },
    ],
  },

  gallery: {
    title: 'El taller',
    images: [
      '/gallery/01.jpg',
      '/gallery/02.jpg',
      '/gallery/03.jpg',
      '/gallery/04.jpg',
      '/gallery/05.jpg',
    ],
  },

  cta: {
    title: 'Ven a tocarlas',
    body: 'El taller abre de martes a sábado. Sin cita, sin compromiso y sin que nadie te mire mientras pruebas.',
    button: 'Reservar una visita',
  },

  footer: {
    columns: [
      { title: 'Producto', links: ['Guitarras', 'Series', 'Accesorios', 'Cuidados'] },
      { title: 'Taller', links: ['Sobre nosotros', 'El proceso', 'Maderas', 'Visitas'] },
      { title: 'Ayuda', links: ['Envíos', 'Garantía', 'Reparaciones', 'Contacto'] },
    ],
    legal: '© 2026 Resonance. Página de demostración.',
  },
}

export default site
```

- [ ] **Step 4: Verificar**

```bash
npm run build
```

Expected: build correcto. Con `npm run dev` abierto, visitar `http://localhost:5173/hero/01.jpg`. Expected: se ve una foto de una guitarra.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add site content and image assets"
```

---

### Task 3: Hooks de base — reduced motion y scroll suave

**Files:**
- Create: `src/hooks/useReducedMotion.js`
- Create: `src/hooks/useLenis.js`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: nada.
- Produces:
  - `useReducedMotion()` → `boolean`. `true` si el usuario pide menos movimiento. Reactivo a cambios del sistema.
  - `useLenis()` → `void`. Monta el scroll suave y lo sincroniza con el ticker de GSAP. Se llama una sola vez, en `App`.

- [ ] **Step 1: Escribir `useReducedMotion`**

```js
import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export default function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
```

- [ ] **Step 2: Escribir `useLenis`**

```js
import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [enabled])
}
```

- [ ] **Step 3: Montarlo en `App.jsx`**

```jsx
import useLenis from './hooks/useLenis.js'
import useReducedMotion from './hooks/useReducedMotion.js'

export default function App() {
  const reduced = useReducedMotion()
  useLenis(!reduced)

  return (
    <main className="min-h-[300vh] grid place-items-center">
      <h1 className="text-6xl">Resonance</h1>
    </main>
  )
}
```

- [ ] **Step 4: Verificar**

```bash
npm run build
```

Expected: build correcto, sin errores.

En el navegador, hacer scroll con la rueda. Expected: el desplazamiento tiene inercia, no salta de golpe. Sin errores en consola.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add reduced-motion and lenis hooks"
```

---

### Task 4: KenBurnsStack — el bucle del hero

**Files:**
- Create: `src/components/KenBurnsStack.jsx`
- Modify: `src/App.jsx` (banco de pruebas temporal)

**Interfaces:**
- Consumes: `useReducedMotion` de la Task 3.
- Produces: `<KenBurnsStack images={string[]} hold={number} fade={number} onReady={() => void} />`. Renderiza un contenedor `absolute inset-0` con las imágenes apiladas. `hold` por defecto `6`, `fade` por defecto `1.4`. `onReady` se llama una única vez, cuando todas las imágenes están decodificadas y el bucle ha arrancado — el Hero lo usa para disparar su intro.

- [ ] **Step 1: Escribir el componente**

```jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import useReducedMotion from '../hooks/useReducedMotion.js'

export default function KenBurnsStack({ images, hold = 6, fade = 1.4, onReady }) {
  const rootRef = useRef(null)
  const readyRef = useRef(onReady)
  readyRef.current = onReady
  const reduced = useReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const slides = Array.from(root.querySelectorAll('[data-slide]'))
    let ctx
    let cancelled = false

    const decodeAll = Promise.all(
      slides.map((img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve())),
    )

    decodeAll.then(() => {
      if (cancelled) return

      if (reduced) {
        gsap.set(slides[0], { opacity: 1 })
        readyRef.current?.()
        return
      }

      ctx = gsap.context(() => {
        const step = hold
        const span = hold + fade

        gsap.set(slides, { opacity: 0, scale: 1.06, xPercent: 0, willChange: 'transform, opacity' })
        gsap.set(slides[0], { opacity: 1 })

        const tl = gsap.timeline({ repeat: -1 })

        slides.forEach((slide, i) => {
          const at = i * step
          const drift = i % 2 === 0 ? 2 : -2

          // Movimiento: zoom lento y pan lateral. Lineal a propósito:
          // cualquier easing hace que el "vídeo" parezca acelerar.
          tl.fromTo(
            slide,
            { scale: 1.06, xPercent: 0 },
            { scale: 1.18, xPercent: drift, duration: span, ease: 'none' },
            at,
          )

          // La primera ya está visible en t=0; las demás entran con crossfade.
          if (i > 0) {
            tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: fade, ease: 'power1.inOut' }, at)
          }

          // Todas salvo la última se apagan cuando entra la siguiente.
          if (i < slides.length - 1) {
            tl.to(slide, { opacity: 0, duration: fade, ease: 'power1.inOut' }, at + step)
          }
        })

        // Cierre del bucle: la última se funde sobre la primera, que vuelve
        // a su estado inicial para que el salto sea invisible.
        const last = slides.length - 1
        const end = last * step
        tl.fromTo(
          slides[0],
          { opacity: 0, scale: 1.06, xPercent: 0 },
          { opacity: 1, duration: fade, ease: 'power1.inOut' },
          end + step,
        )
        tl.to(slides[last], { opacity: 0, duration: fade, ease: 'power1.inOut' }, end + step)
        tl.set({}, {}, end + step + fade)
      }, root)

      readyRef.current?.()
    })

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [images, hold, fade, reduced])

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {images.map((src, i) => (
        <img
          key={src}
          data-slide
          src={src}
          alt=""
          decoding="async"
          fetchPriority={i === 0 ? 'high' : 'low'}
          className="absolute inset-0 h-full w-full object-cover opacity-0"
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Banco de pruebas temporal en `App.jsx`**

```jsx
import KenBurnsStack from './components/KenBurnsStack.jsx'
import useLenis from './hooks/useLenis.js'
import useReducedMotion from './hooks/useReducedMotion.js'
import site from './data/site.js'

export default function App() {
  const reduced = useReducedMotion()
  useLenis(!reduced)

  return (
    <main>
      <section className="relative h-screen">
        <KenBurnsStack images={site.hero.slides} />
      </section>
    </main>
  )
}
```

- [ ] **Step 3: Verificar el bucle en el navegador**

Abrir la página y observar durante un ciclo completo, ~26 s (4 slides × 6 s + fundido).

Expected:
- La imagen hace zoom y desplazamiento continuos, sin tirones ni aceleraciones.
- Cada cambio es un fundido, nunca un corte ni un frame en negro.
- Al volver a la primera imagen, el salto no se nota.
- Consola sin errores.

- [ ] **Step 4: Verificar reduced motion**

En DevTools: `Rendering` → `Emulate CSS prefers-reduced-motion: reduce`, y recargar.

Expected: se ve la primera imagen, completamente quieta. Nada se mueve.

- [ ] **Step 5: Verificar el build**

```bash
npm run build
```

Expected: sin errores.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: add KenBurnsStack looping hero background"
```

---

### Task 5: Primitivas de texto y número — SplitText y Counter

**Files:**
- Create: `src/components/SplitText.jsx`
- Create: `src/components/Counter.jsx`

**Interfaces:**
- Consumes: `useReducedMotion` de la Task 3.
- Produces:
  - `<SplitText text={string} className={string} />` → renderiza cada palabra dentro de un `<span data-word>` envuelto en un `<span>` con `overflow-hidden`, listo para que un timeline externo anime `yPercent`. Los saltos de línea `\n` del texto se respetan como saltos duros. No anima por sí mismo.
  - `<Counter to={number} suffix={string} duration={number} start={boolean} />` → renderiza un número que cuenta de 0 a `to` cuando `start` pasa a `true`. `duration` por defecto `1.4`.

- [ ] **Step 1: Escribir `SplitText`**

```jsx
export default function SplitText({ text, className = '' }) {
  const lines = text.split('\n')

  return (
    <span className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((word, wi) => (
            <span key={wi} className="inline-block overflow-hidden align-bottom">
              <span data-word className="inline-block will-change-transform">
                {word}
                {wi < line.split(' ').length - 1 ? '\u00A0' : ''}
              </span>
            </span>
          ))}
        </span>
      ))}
    </span>
  )
}
```

- [ ] **Step 2: Escribir `Counter`**

```jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import useReducedMotion from '../hooks/useReducedMotion.js'

export default function Counter({ to, suffix = '', duration = 1.4, start = true }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!start || reduced) {
      el.textContent = `${to}${suffix}`
      return
    }

    const obj = { n: 0 }
    const tween = gsap.to(obj, {
      n: to,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${Math.round(obj.n)}${suffix}`
      },
    })

    return () => tween.kill()
  }, [to, suffix, duration, start, reduced])

  return <span ref={ref}>0{suffix}</span>
}
```

- [ ] **Step 3: Verificar**

```bash
npm run build
```

Expected: sin errores. Estos componentes se verán funcionando en la Task 6; aquí basta con que compilen.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add SplitText and Counter primitives"
```

---

### Task 6: Nav

**Files:**
- Create: `src/components/Nav.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `site.nav`, `site.brand`.
- Produces: `<Nav />`. Renderiza una barra fija con `data-nav` en el elemento raíz — el timeline de la Task 7 la anima por ese atributo. Empieza con `opacity: 0` para que no parpadee antes de la intro.

- [ ] **Step 1: Escribir el componente**

```jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import site from '../data/site.js'

gsap.registerPlugin(ScrollTrigger)

export default function Nav() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Al bajar, la píldora se encoge y se oscurece.
      gsap.to('[data-pill]', {
        scale: 0.96,
        backgroundColor: 'rgba(10,10,11,0.72)',
        ease: 'none',
        scrollTrigger: { start: 100, end: 240, scrub: true },
      })
    }, ref)

    // ctx.revert() mata solo los triggers creados aquí dentro. No usar
    // ScrollTrigger.getAll() en el cleanup: mataría los de otras secciones.
    return () => ctx.revert()
  }, [])

  return (
    <header
      ref={ref}
      data-nav
      className="fixed inset-x-0 top-5 z-40 flex justify-center px-4 opacity-0"
    >
      <nav
        data-pill
        className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-xl"
      >
        <a href="#top" className="px-4 text-sm font-semibold tracking-tight">
          {site.brand}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.links.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="rounded-full px-4 py-2 text-sm text-mute transition-colors hover:text-bone focus-visible:text-bone focus-visible:outline-2 focus-visible:outline-amber"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#"
          className="rounded-full bg-bone px-5 py-2 text-sm font-medium text-ink transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-amber"
        >
          {site.nav.cta}
        </a>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Montar en `App.jsx`**

Añadir `<Nav />` como primer hijo de `<main>`, encima de la sección del hero.

- [ ] **Step 3: Verificar**

Como el nav está a `opacity: 0` y su timeline aún no existe, para esta comprobación quitar temporalmente `opacity-0` de la clase.

Expected: píldora flotante centrada arriba, con desenfoque del fondo; al hacer scroll se encoge ligeramente. Con `Tab` se recorren los enlaces y el foco es visible.

Volver a poner `opacity-0` antes de commitear.

- [ ] **Step 4: Verificar el build**

```bash
npm run build
```

Expected: sin errores.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add floating pill nav"
```

---

### Task 7: Hero y timeline de entrada

**Files:**
- Create: `src/hooks/useIntroTimeline.js`
- Create: `src/sections/Hero.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `KenBurnsStack` (Task 4), `SplitText` y `Counter` (Task 5), `Nav` (Task 6), `site.hero`.
- Produces:
  - `useIntroTimeline({ scope, ready })` → `{ done: boolean }`. `scope` es una ref al contenedor del hero; `ready` es un booleano que dispara el timeline cuando pasa a `true`. Devuelve `done`, que el Hero usa para arrancar los contadores.
  - `<Hero />` — sección `h-screen` completa.

El timeline busca sus objetivos por atributo de datos, todos dentro de `scope` salvo el nav: `[data-curtain]`, `[data-nav]`, `[data-overline]`, `[data-word]`, `[data-body]`, `[data-cta]`, `[data-stats]`, `[data-card]`.

- [ ] **Step 1: Escribir `useIntroTimeline`**

```js
import { useEffect, useState } from 'react'
import gsap from 'gsap'
import useReducedMotion from './useReducedMotion.js'

export default function useIntroTimeline({ scope, ready }) {
  const [done, setDone] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!ready || !scope.current) return

    let ctx
    let cancelled = false

    // Esperamos a las fuentes: animar el título antes de que Inter cargue
    // provoca un salto de métrica a mitad de la animación.
    document.fonts.ready.then(() => {
      if (cancelled) return

      ctx = gsap.context(() => {
        if (reduced) {
          gsap.set('[data-curtain]', { display: 'none' })
          gsap.to(
            ['[data-nav]', '[data-overline]', '[data-word]', '[data-body]', '[data-cta]', '[data-stats]', '[data-card]'],
            { opacity: 1, duration: 0.3, onComplete: () => setDone(true) },
          )
          return
        }

        const tl = gsap.timeline({
          defaults: { ease: 'expo.out' },
          onComplete: () => setDone(true),
        })

        tl.to('[data-curtain]', { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 0)
          .set('[data-curtain]', { display: 'none' })
          .fromTo('[data-nav]', { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.2)
          .fromTo('[data-overline]', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.35)
          .fromTo(
            '[data-word]',
            { yPercent: 110 },
            { yPercent: 0, duration: 1.1, stagger: 0.07 },
            0.45,
          )
          .fromTo('[data-body]', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.9)
          .fromTo(
            '[data-cta]',
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
            1.05,
          )
          .fromTo('[data-stats]', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.15)
          .fromTo('[data-card]', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 }, 1.2)
      })
    })

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [ready, scope, reduced])

  return { done }
}
```

Nota: `[data-nav]` y `[data-curtain]` viven fuera de `scope`, así que el contexto se crea sin scope y los selectores son globales. Es intencionado.

- [ ] **Step 2: Escribir `Hero.jsx`**

```jsx
import { useRef, useState } from 'react'
import KenBurnsStack from '../components/KenBurnsStack.jsx'
import SplitText from '../components/SplitText.jsx'
import Counter from '../components/Counter.jsx'
import useIntroTimeline from '../hooks/useIntroTimeline.js'
import site from '../data/site.js'

export default function Hero() {
  const scope = useRef(null)
  const [ready, setReady] = useState(false)
  const { done } = useIntroTimeline({ scope, ready })
  const { hero } = site

  return (
    <>
      <div
        data-curtain
        className="fixed inset-0 z-50 bg-ink"
        aria-hidden="true"
      />

      <section ref={scope} id="top" className="relative h-screen overflow-hidden">
        <KenBurnsStack images={hero.slides} onReady={() => setReady(true)} />

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
          <p
            data-overline
            className="mb-6 text-xs uppercase tracking-[0.3em] text-amber opacity-0"
          >
            {hero.overline}
          </p>

          <h1 className="max-w-[16ch] text-[clamp(3rem,11vw,10rem)]">
            <SplitText text={hero.title} />
          </h1>

          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-md">
              <p data-body className="text-base leading-relaxed text-mute opacity-0">
                {hero.body}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  data-cta
                  href="#"
                  className="rounded-full bg-bone px-7 py-3.5 text-sm font-medium text-ink opacity-0 transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-amber"
                >
                  {hero.primaryCta}
                </a>
                <a
                  data-cta
                  href="#"
                  className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium opacity-0 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-amber"
                >
                  {hero.secondaryCta}
                </a>
              </div>

              <dl data-stats className="mt-12 flex gap-10 opacity-0">
                {hero.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-3xl font-semibold tracking-tight md:text-4xl">
                      <Counter to={stat.value} suffix={stat.suffix} start={done} />
                    </dt>
                    <dd className="mt-1 text-xs text-mute">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <article
              data-card
              className="w-full max-w-xs rounded-2xl border border-white/10 bg-white/5 p-3 opacity-0 backdrop-blur-xl"
            >
              <img
                src={hero.card.image}
                alt={hero.card.name}
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
              <div className="flex items-end justify-between px-2 py-3">
                <div>
                  <h2 className="text-sm font-semibold">{hero.card.name}</h2>
                  <p className="mt-0.5 text-xs text-mute">{hero.card.note}</p>
                </div>
                <p className="text-sm font-medium text-amber">{hero.card.price}</p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Montar en `App.jsx`**

```jsx
import Nav from './components/Nav.jsx'
import Hero from './sections/Hero.jsx'
import useLenis from './hooks/useLenis.js'
import useReducedMotion from './hooks/useReducedMotion.js'

export default function App() {
  const reduced = useReducedMotion()
  useLenis(!reduced)

  return (
    <main>
      <Nav />
      <Hero />
    </main>
  )
}
```

- [ ] **Step 4: Verificar la intro en el navegador**

Recargar con caché deshabilitada.

Expected, en este orden y sin solapes raros:
1. Pantalla negra breve, que se disuelve.
2. El nav baja.
3. El overline aparece.
4. Las palabras del titular suben desde abajo, una tras otra, recortadas por su línea.
5. Párrafo, botones, stats contando de 0, y la tarjeta entrando por la derecha.
6. El fondo ya está en movimiento cuando desaparece la cortina.

Nada debe verse antes de que la cortina se disuelva. Consola sin errores.

- [ ] **Step 5: Verificar reduced motion**

Con `prefers-reduced-motion: reduce` emulado y recarga.

Expected: todo aparece con un fade corto, el fondo está quieto, los números muestran su valor final directamente.

- [ ] **Step 6: Verificar el build**

```bash
npm run build
```

Expected: sin errores.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: add hero section with orchestrated intro timeline"
```

---

### Task 8: Reveal y marquee de series

**Files:**
- Create: `src/components/Reveal.jsx`
- Create: `src/sections/SeriesMarquee.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `useReducedMotion` (Task 3), `site.series`.
- Produces:
  - `<Reveal as="div" className="" delay={0}>{children}</Reveal>` → envuelve contenido y lo revela (`y 40 → 0`, `opacity 0 → 1`) cuando su parte superior cruza el 80 % del viewport. Se dispara una sola vez. Usado por todas las secciones posteriores.
  - `<SeriesMarquee />` — cinta infinita.

- [ ] **Step 1: Escribir `Reveal`**

```jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../hooks/useReducedMotion.js'

gsap.registerPlugin(ScrollTrigger)

export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [delay, reduced])

  return (
    <Tag ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </Tag>
  )
}
```

- [ ] **Step 2: Escribir `SeriesMarquee`**

```jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import useReducedMotion from '../hooks/useReducedMotion.js'
import site from '../data/site.js'

export default function SeriesMarquee() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      // Dos copias idénticas: cuando la primera ha recorrido su ancho,
      // la segunda está exactamente en su sitio y el reinicio no se ve.
      const tween = gsap.to('[data-track]', {
        xPercent: -50,
        duration: 28,
        ease: 'none',
        repeat: -1,
      })

      const root = ref.current
      const pause = () => tween.pause()
      const play = () => tween.play()
      root.addEventListener('mouseenter', pause)
      root.addEventListener('mouseleave', play)
      root.addEventListener('focusin', pause)
      root.addEventListener('focusout', play)
    }, ref)

    return () => ctx.revert()
  }, [reduced])

  const items = [...site.series, ...site.series]

  return (
    <section
      ref={ref}
      className="overflow-hidden border-y border-white/10 py-8"
      aria-label="Nuestras series"
    >
      <div data-track className="flex w-max gap-16 pr-16">
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="text-2xl font-medium tracking-tight text-mute md:text-3xl"
            aria-hidden={i >= site.series.length}
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Montar en `App.jsx`**

Añadir `<SeriesMarquee />` justo después de `<Hero />`.

- [ ] **Step 4: Verificar**

Expected: la cinta se desplaza a la izquierda de forma continua y, al llegar al final, reengancha sin corte visible. Se detiene al pasar el ratón por encima y al recibir foco de teclado. Con reduced motion, está quieta.

```bash
npm run build
```

Expected: sin errores.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add Reveal wrapper and series marquee"
```

---

### Task 9: Showcase con imagen pinned

**Files:**
- Create: `src/sections/Showcase.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `Reveal` (Task 8), `useReducedMotion` (Task 3), `site.products`.
- Produces: `<Showcase />` — una sección alta en la que la columna de imagen queda fija mientras la de texto scrollea; la imagen cambia con crossfade al llegar a cada producto.

- [ ] **Step 1: Escribir el componente**

```jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from '../components/Reveal.jsx'
import useReducedMotion from '../hooks/useReducedMotion.js'
import site from '../data/site.js'

gsap.registerPlugin(ScrollTrigger)

export default function Showcase() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray('[data-shot]')
      const panels = gsap.utils.toArray('[data-panel]')

      gsap.set(images, { opacity: 0 })
      gsap.set(images[0], { opacity: 1 })

      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 60%',
          end: 'bottom 60%',
          onToggle: (self) => {
            if (!self.isActive) return
            gsap.to(images, { opacity: 0, duration: 0.5, ease: 'power2.inOut' })
            gsap.to(images[i], { opacity: 1, duration: 0.5, ease: 'power2.inOut' })
          },
        })
      })
    }, ref)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={ref} className="mx-auto max-w-[1400px] px-6 py-28 md:px-10">
      <Reveal>
        <h2 className="max-w-[14ch] text-[clamp(2.5rem,6vw,5rem)]">
          Tres formas de sonar
        </h2>
      </Reveal>

      <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="hidden lg:block">
          <div className="sticky top-24 aspect-[4/5] overflow-hidden rounded-3xl bg-surface">
            {site.products.map((product) => (
              <img
                key={product.id}
                data-shot
                src={product.image}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ))}
          </div>
        </div>

        <div>
          {site.products.map((product) => (
            <article
              key={product.id}
              data-panel
              className="border-b border-white/10 py-14 first:pt-0 last:border-0"
            >
              <img
                src={product.image}
                alt={product.name}
                className="mb-8 aspect-[4/3] w-full rounded-2xl object-cover lg:hidden"
              />
              <p className="text-xs uppercase tracking-[0.3em] text-amber">
                {product.eyebrow}
              </p>
              <h3 className="mt-4 text-4xl md:text-5xl">{product.name}</h3>
              <p className="mt-5 max-w-md leading-relaxed text-mute">{product.body}</p>
              <p className="mt-8 text-lg font-medium">{product.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

Nota: la columna fija usa `position: sticky` de CSS en vez del `pin` de ScrollTrigger. Es más simple, no toca el layout y convive mejor con Lenis. ScrollTrigger solo decide qué imagen se ve.

- [ ] **Step 2: Montar en `App.jsx`**

Añadir `<Showcase />` después de `<SeriesMarquee />`.

- [ ] **Step 3: Verificar**

Expected: en pantalla ancha, la imagen de la izquierda se queda quieta mientras los tres bloques de texto pasan por la derecha, y cambia con un fundido al entrar cada producto. En móvil (< 1024 px) cada producto muestra su propia imagen encima del texto y no hay columna fija.

```bash
npm run build
```

Expected: sin errores.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add sticky product showcase"
```

---

### Task 10: Specs, galería bento, CTA final y footer

**Files:**
- Create: `src/sections/Specs.jsx`
- Create: `src/sections/Gallery.jsx`
- Create: `src/sections/FinalCTA.jsx`
- Create: `src/sections/Footer.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `Reveal` (Task 8), `Counter` (Task 5), `site.specs`, `site.gallery`, `site.cta`, `site.footer`, `site.brand`.
- Produces: las cuatro secciones finales de la página.

- [ ] **Step 1: Escribir `Specs.jsx`**

```jsx
import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import Reveal from '../components/Reveal.jsx'
import Counter from '../components/Counter.jsx'
import site from '../data/site.js'

gsap.registerPlugin(ScrollTrigger)

export default function Specs() {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 75%',
      once: true,
      onEnter: () => setStarted(true),
    })
    return () => st.kill()
  }, [])

  return (
    <section ref={ref} className="border-y border-white/10 bg-surface">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10">
        <Reveal>
          <h2 className="max-w-[16ch] text-[clamp(2.5rem,6vw,5rem)]">
            {site.specs.title}
          </h2>
        </Reveal>

        <dl className="mt-20 grid grid-cols-2 gap-12 lg:grid-cols-4">
          {site.specs.items.map((item, i) => (
            <Reveal key={item.label} as="div" delay={i * 0.08}>
              <dt className="text-[clamp(3rem,7vw,6rem)] font-semibold tracking-tight">
                <Counter to={item.value} suffix={item.suffix} start={started} />
              </dt>
              <dd className="mt-2 text-sm text-mute">{item.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Escribir `Gallery.jsx`**

```jsx
import Reveal from '../components/Reveal.jsx'
import site from '../data/site.js'

const SPANS = [
  'md:col-span-2 md:row-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-1',
]

export default function Gallery() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10">
      <Reveal>
        <h2 className="text-[clamp(2.5rem,6vw,5rem)]">{site.gallery.title}</h2>
      </Reveal>

      <div className="mt-16 grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-4">
        {site.gallery.images.map((src, i) => (
          <Reveal
            key={src}
            as="figure"
            delay={i * 0.06}
            className={`group overflow-hidden rounded-2xl bg-surface ${SPANS[i]}`}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Escribir `FinalCTA.jsx`**

```jsx
import Reveal from '../components/Reveal.jsx'
import site from '../data/site.js'

export default function FinalCTA() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-32 text-center md:px-10">
      <Reveal>
        <h2 className="mx-auto max-w-[12ch] text-[clamp(3rem,9vw,8rem)]">
          {site.cta.title}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mx-auto mt-8 max-w-md leading-relaxed text-mute">{site.cta.body}</p>
      </Reveal>
      <Reveal delay={0.2}>
        <a
          href="#"
          className="mt-10 inline-block rounded-full bg-bone px-8 py-4 text-sm font-medium text-ink transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-amber"
        >
          {site.cta.button}
        </a>
      </Reveal>
    </section>
  )
}
```

- [ ] **Step 4: Escribir `Footer.jsx`**

```jsx
import site from '../data/site.js'

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <p className="text-xl font-semibold tracking-tight">{site.brand}</p>

          {site.footer.columns.map((column) => (
            <nav key={column.title}>
              <h3 className="text-xs uppercase tracking-[0.25em] text-mute">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-mute transition-colors hover:text-bone focus-visible:text-bone focus-visible:outline-2 focus-visible:outline-amber"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-16 text-xs text-mute">{site.footer.legal}</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: Montar todo en `App.jsx`**

```jsx
import Nav from './components/Nav.jsx'
import Hero from './sections/Hero.jsx'
import SeriesMarquee from './sections/SeriesMarquee.jsx'
import Showcase from './sections/Showcase.jsx'
import Specs from './sections/Specs.jsx'
import Gallery from './sections/Gallery.jsx'
import FinalCTA from './sections/FinalCTA.jsx'
import Footer from './sections/Footer.jsx'
import useLenis from './hooks/useLenis.js'
import useReducedMotion from './hooks/useReducedMotion.js'

export default function App() {
  const reduced = useReducedMotion()
  useLenis(!reduced)

  return (
    <main>
      <Nav />
      <Hero />
      <SeriesMarquee />
      <Showcase />
      <Specs />
      <Gallery />
      <FinalCTA />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 6: Verificar**

Expected: la página completa scrollea de arriba abajo. Cada sección aparece al entrar en pantalla. Los cuatro números de Specs cuentan desde 0 la primera vez que se ven. El bento tiene una celda grande arriba a la izquierda.

```bash
npm run build
```

Expected: sin errores.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: add specs, gallery, final cta and footer"
```

---

### Task 11: Pase final de accesibilidad, rendimiento y responsive

**Files:**
- Modify: `index.html`
- Modify: cualquier archivo donde el pase detecte un fallo.
- Create: `README.md`

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: la landing verificada contra los seis criterios de la sección 9 del spec, más un README con instrucciones de arranque y de sustitución de imágenes.

- [ ] **Step 1: Preload de la primera imagen del hero**

En `index.html`, dentro de `<head>`:

```html
<link rel="preload" as="image" href="/hero/01.jpg" fetchpriority="high" />
```

- [ ] **Step 2: Verificar responsive a 375 px**

En DevTools, modo dispositivo, 375 × 812.

Expected: ningún desbordamiento horizontal (la barra de scroll horizontal no aparece). El titular del hero no se corta. La tarjeta de producto del hero ocupa el ancho disponible sin salirse. Corregir con clases responsive lo que falle.

- [ ] **Step 3: Verificar navegación por teclado**

Recargar y recorrer la página entera solo con `Tab`.

Expected: el foco es siempre visible (anillo ámbar), el orden es de arriba abajo y no queda atrapado en ningún sitio.

- [ ] **Step 4: Verificar contraste del hero**

Con el cuentagotas de DevTools, medir el texto del párrafo del hero (`--color-mute` sobre la imagen más clara del bucle).

Expected: ratio ≥ 4.5:1. Si no llega, subir la opacidad del gradiente `from-ink` de la Task 7 hasta que cumpla.

- [ ] **Step 5: Verificar reduced motion en la página completa**

Con `prefers-reduced-motion: reduce` emulado, recargar y scrollear hasta el final.

Expected: nada se mueve — ni hero, ni marquee, ni reveals, ni contadores animando. Todo el contenido es legible.

- [ ] **Step 6: Verificar consola y build limpios**

```bash
npm run build
```

Expected: sin errores ni warnings. La consola del navegador, tras recargar y scrollear hasta el final, no muestra ningún error.

- [ ] **Step 7: Escribir el `README.md`**

Debe contener: qué es el proyecto, `npm install` y `npm run dev`, dónde está el contenido (`src/data/site.js`), cómo sustituir las imágenes del hero (dejar archivos en `public/hero/` y actualizar el array `hero.slides`), y cómo ajustar el ritmo del bucle (props `hold` y `fade` de `KenBurnsStack`).

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "chore: accessibility, performance and responsive pass + readme"
```

---

### Task 12: Resumen final para el usuario

**Files:**
- Create: `docs/RESUMEN.md`

**Interfaces:**
- Consumes: el proyecto terminado.
- Produces: el esquema sintético que el usuario pidió expresamente.

- [ ] **Step 1: Escribir `docs/RESUMEN.md`**

Un documento breve, en esquema, sin relleno, con:

1. **Qué se construyó** — árbol de secciones de la página, una línea cada una.
2. **Tabla de tecnología** — columnas: `Tecnología` · `Dónde se usa` · `Por qué esa` · `Para qué sirve`. Una fila por cada una: Vite, React, Tailwind v4, GSAP, ScrollTrigger, Lenis.
3. **Los dos efectos pedidos** — cómo se resolvió el fade-in de carga y cómo se resolvió el hero en bucle, dos párrafos cortos, nombrando el archivo exacto de cada uno.
4. **Cómo tocarlo** — tres líneas: cambiar copy, cambiar imágenes, cambiar el ritmo del bucle.

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "docs: add project summary"
```

- [ ] **Step 3: Entregar el resumen al usuario**

Enviar `docs/RESUMEN.md` con `SendUserFile` y reproducir el esquema en el chat.
