# 🎸 Resonance

**Landing multi-página para una marca ficticia de guitarras artesanales**, con estética inspirada en las páginas de producto de Apple: animaciones de entrada orquestadas, scroll narrativo y transiciones de imagen sin usar un solo vídeo de fondo.

Proyecto de demostración construido con **React 19 + Vite + Tailwind CSS v4 + GSAP + Lenis**.

![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3-88ce02?logo=greensock&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)
![License](https://img.shields.io/badge/uso-demo%20%2F%20portfolio-lightgrey)

---

## ✨ Características principales

### 🏠 Home
- **Hero "en bucle como vídeo" sin vídeo**: cuatro fotografías en `KenBurnsStack` con zoom y paneo lentos que se funden entre sí en bucle infinito — el efecto de movimiento de fondo de una página de producto, con el peso de cuatro imágenes.
- **Animación de entrada orquestada**: una cortina a pantalla completa se desvanece mientras el titular se revela palabra por palabra, seguido de overline, texto, CTAs, estadísticas y la tarjeta de producto — todo un único `gsap.timeline()`.
- **CTAs con relleno de color**: "Descubrir la colección" se rellena de ámbar de izquierda a derecha; "Ver el taller" lo hace radialmente desde el centro — sin desplazar el texto.
- **Cinta de maderas en bucle infinito** sin salto visual ni hueco en pantallas anchas.
- **Showcase con scroll-sync**: la imagen del producto cambia de crossfade según qué panel de texto está en pantalla.
- **Contadores animados**, galería en grid asimétrico y CTA final.

### 🎸 /guitarras — Catálogo
- **Carrusel "expand on hover"** (inspirado en los componentes de la marketplace de Framer): la guitarra sobre la que pasas el cursor crece con una transición de `flex-grow` y revela categoría + precio; en móvil se convierte en un carrusel de scroll con snap.
- **12 modelos** repartidos en 4 familias — clásicas, acústicas, electroacústicas, eléctricas —, cada una con su propia sección y grid de fichas.

### 🔧 /taller — El taller
- **Guitarra que se monta pieza a pieza mientras haces scroll**, inspirado en el "look inside" de la página de AirPods Pro de Apple: cuerpo, mástil, roseta, puente, clavijero y cuerdas van apareciendo en una ilustración SVG con degradados (tapa sunburst, diapasón, incrustaciones), sincronizada a un único timeline de GSAP scrubbed por el scroll.
- **5 datos del taller** (ubicación, años de oficio, política de materiales, afinado final) que se revelan en sincronía con cada pieza que se monta.
- **Indicador de scroll** animado antes de empezar el montaje.
- **Vídeo-tour de las instalaciones** en bucle automático (silenciado, como exige cualquier navegador) y galería de fotos del taller.

### 🌐 Transversal
- **Navegación con estado activo** entre las tres páginas, con su propia animación de entrada independiente del Hero.
- **`prefers-reduced-motion` respetado en toda la app**: cada animación tiene una rama estática — contenido siempre visible, nunca oculto tras una animación que no llega a ejecutarse.
- **Accesibilidad**: foco visible en todos los elementos interactivos, landmarks semánticos, `alt` en imágenes decorativas vacío a propósito.

---

## 🧱 Stack tecnológico

| Tecnología | Para qué se usa |
|---|---|
| **[React 19](https://react.dev/)** | Componentes y estado de la UI. |
| **[Vite](https://vite.dev/)** | Servidor de desarrollo y build de producción. |
| **[React Router](https://reactrouter.com/)** | Enrutado cliente entre `/`, `/guitarras` y `/taller`. |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Utilidades de estilo, vía el plugin nativo de Vite (`@tailwindcss/vite`, sin PostCSS). |
| **[GSAP 3](https://gsap.com/) + ScrollTrigger** | Timelines de entrada, reveals al hacer scroll y el montaje de la guitarra scrubbed por scroll. |
| **[Lenis](https://lenis.darkroom.engineering/)** | Scroll suavizado, integrado con el ticker de GSAP para que ScrollTrigger no se desincronice. |

---

## 🏗️ Arquitectura

### Enrutado y layout compartido
`App.jsx` es el shell de la aplicación: monta `<BrowserRouter>`, la navegación y el footer una sola vez, y resuelve las tres páginas (`Home`, `Guitarras`, `Taller`) dentro de `<Routes>`. Al cambiar de ruta el scroll se resetea al inicio.

### Contenido separado de los componentes
Todo el copy y los datos viven en `src/data/` (`site.js`, `catalog.js`, `taller.js`) como objetos planos — ningún texto está hardcodeado en JSX. Cambiar un precio, una foto o una frase es editar un objeto, no tocar un componente.

### Patrón de animación
- **Entrada orquestada**: un `gsap.timeline()` por página/sección que anima varios elementos con offsets relativos (`"-=0.x"`), esperando a que las fuentes y la primera imagen estén listas (con timeout de seguridad, para que la cortina de carga nunca se quede colgada).
- **Reveals al hacer scroll**: un componente `<Reveal>` genérico basado en `ScrollTrigger.create(...)` que reutilizan todas las secciones.
- **Scroll-scrub**: el montaje de la guitarra usa un wrapper alto (`500vh`) + un hijo `position: sticky` en vez del `pin` propio de ScrollTrigger — más simple y con menos fricción junto a Lenis.
- **`prefers-reduced-motion`**: cada pieza animada tiene una rama `reduced` que aplica el estado final directamente, sin animar.

### Estilos
Tailwind v4 usa *cascade layers*; toda regla CSS de autor en `src/styles/index.css` vive dentro de `@layer` para no pisar silenciosamente las utilidades por orden de cascada.

---

## 📁 Estructura del proyecto

```
src/
├── components/       # Piezas reusables entre páginas
│   ├── Counter.jsx        # Contador animado con GSAP
│   ├── GuitarAssembly.jsx # Ilustración SVG + timeline scroll-scrubbed
│   ├── GuitarCard.jsx     # Ficha de producto del catálogo
│   ├── HoverCarousel.jsx  # Carrusel "expand on hover"
│   ├── KenBurnsStack.jsx  # Crossfade + zoom en bucle para el hero
│   ├── Nav.jsx             # Navegación fija, con estado activo por ruta
│   ├── Reveal.jsx          # Fade/slide genérico al entrar en viewport
│   └── SplitText.jsx      # Divide texto en palabras para animarlo
├── data/             # Todo el contenido de la página
│   ├── site.js             # Home: hero, specs, galería, footer...
│   ├── catalog.js          # Catálogo de guitarras y categorías
│   └── taller.js           # Copy y checkpoints de la página del taller
├── hooks/
│   ├── useIntroTimeline.js # Timeline de entrada del Hero
│   ├── useLenis.js         # Inicializa Lenis + lo conecta a ScrollTrigger
│   └── useReducedMotion.js # Lee y suscribe prefers-reduced-motion
├── pages/
│   ├── Home.jsx
│   ├── Guitarras.jsx
│   └── Taller.jsx
├── sections/         # Secciones específicas de Home
│   ├── Hero.jsx
│   ├── Showcase.jsx
│   ├── Specs.jsx
│   ├── Gallery.jsx
│   ├── WoodsMarquee.jsx
│   ├── FinalCTA.jsx
│   └── Footer.jsx
├── styles/index.css
├── App.jsx           # Router + layout compartido (Nav/Footer)
└── main.jsx          # Punto de entrada

public/
├── hero/             # Fotos del bucle del hero
├── gallery/          # Fotos del taller (Home + página /taller)
├── products/          # Fotos de producto, + products/guitars para el catálogo
└── taller/           # Vídeo-tour y su poster
```

---

## 🚀 Puesta en marcha

```bash
npm install
npm run dev
```

Otros comandos disponibles:

```bash
npm run build    # build de producción en dist/
npm run preview  # sirve el build de producción localmente
```

---

## 🎨 Personalizar contenido

Todo el texto, precios y rutas de imagen de las tres páginas viven en `src/data/`:

| Página | Fichero |
|---|---|
| Home | `src/data/site.js` |
| /guitarras | `src/data/catalog.js` |
| /taller | `src/data/taller.js` |

Para sustituir las imágenes del hero, coloca los archivos en `public/hero/` y actualiza `hero.slides` en `site.js`. La primera imagen del array se precarga en `index.html` con `<link rel="preload">`; si cambias qué imagen ocupa esa posición, actualiza también esa ruta ahí.

El ritmo del bucle del hero (cuánto dura cada imagen en pantalla y cuánto tarda el crossfade) se controla con las props `hold` y `fade` de `<KenBurnsStack />`, en `src/sections/Hero.jsx`.

---

## ♿ Accesibilidad

- Todas las animaciones tienen una rama sin movimiento para `prefers-reduced-motion: reduce` — nada queda oculto esperando una animación que el navegador no va a ejecutar.
- Foco visible (`focus-visible:outline`) en todos los enlaces, botones y tarjetas interactivas.
- El vídeo del taller solo arranca solo y en bucle si el usuario no pidió menos movimiento; si lo pidió, se queda pausado en su fotograma de póster con controles a la vista.

---

> Proyecto de demostración / portfolio. Marca, productos y datos son ficticios.
