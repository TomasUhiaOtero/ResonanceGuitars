# Landing "Resonance" — tienda de guitarras, estética Apple

Fecha: 2026-09-02
Estado: aprobado por el usuario

## 1. Objetivo

Landing page de una sola página para una tienda de guitarras premium. Prueba de
concepto visual centrada en dos efectos:

1. **Entrada orquestada al cargar** — todo el hero aparece con un fade-in
   escalonado, no de golpe.
2. **Hero vivo** — la imagen de fondo se mueve en bucle infinito como si fuera
   un vídeo, sin usar ningún archivo de vídeo.

Referencias de estilo aportadas por el usuario: Winzy, Veluno, Pixel Bloom
(navs flotantes tipo píldora, tipografía gigante, tarjetas superpuestas al
hero). Dirección visual final: Apple — negro profundo, mucho aire, producto
protagonista, tipografía enorme centrada.

## 2. Stack

| Pieza | Elección | Por qué |
|---|---|---|
| Bundler | Vite | Arranque instantáneo, HMR, cero configuración |
| UI | React 19 (JSX, sin TypeScript) | Componentes reutilizables; JSX porque es una prueba, no producción |
| Estilos | Tailwind CSS v4 (`@tailwindcss/vite`) | Utilidades y tokens de diseño sin CSS suelto |
| Animación | GSAP 3 + ScrollTrigger | Timelines encadenados y control preciso; no replicable con CSS puro |
| Scroll | Lenis | Inercia suave estilo Apple; se sincroniza con ScrollTrigger |

Sin backend, sin router, sin gestor de estado. Todo es estático.

## 3. Arquitectura de archivos

```
src/
  main.jsx
  App.jsx                  # monta Lenis + orden de secciones
  data/site.js             # TODO el contenido: copys, slides, productos, specs
  hooks/
    useIntroTimeline.js    # timeline de entrada, disparado con fonts.ready
    useReducedMotion.js    # booleano reactivo
    useLenis.js            # scroll suave + puente a ScrollTrigger
  components/
    KenBurnsStack.jsx      # motor del bucle del hero
    Nav.jsx
    SplitText.jsx          # parte un string en spans por palabra
    Counter.jsx            # cuenta de 0 a N con GSAP
    Marquee.jsx
    Reveal.jsx             # wrapper de reveal por ScrollTrigger
  sections/
    Hero.jsx
    SeriesMarquee.jsx
    Showcase.jsx           # imagen pinned + texto que scrollea
    Specs.jsx
    Gallery.jsx            # bento
    FinalCTA.jsx
    Footer.jsx
  styles/index.css         # import de tailwind + tokens + fuentes
public/hero/               # imágenes locales (vacío al inicio: se usan URLs remotas)
```

Cada sección es autocontenida: recibe sus datos de `data/site.js` y no conoce a
sus hermanas. `KenBurnsStack` no sabe nada del hero — recibe un array de URLs y
ya.

## 4. KenBurnsStack — el bucle del hero

**Contrato**

```
<KenBurnsStack
  images={[url, url, url, url]}   // requerido, 3-5 elementos
  hold={6}                        // segundos visibles por imagen
  fade={1.4}                      // segundos de crossfade
/>
```

**Comportamiento**

- N imágenes en `absolute inset-0`, `object-cover`, `w-full h-full`.
- Estado inicial: la primera a `opacity 1`, el resto a `opacity 0`.
- Un único `gsap.timeline({ repeat: -1 })`. Para cada índice `i`:
  - `scale` de `1.06` a `1.18` y `xPercent` de `0` a `±2` durante `hold + fade`,
    con `ease: "none"` (el movimiento debe ser lineal; si acelera, se nota).
  - `opacity` de `0` a `1` en `fade` segundos, con `ease: "power1.inOut"`.
  - La entrada de `i+1` empieza `hold` segundos después de la de `i`, de modo
    que los dos crossfades se solapan y nunca hay un frame en negro.
- La dirección del pan alterna (par → derecha, impar → izquierda) para que el
  bucle no parezca un tic repetido.
- El timeline se crea dentro de un `gsap.context()` y se limpia en el cleanup
  del `useEffect`.

**Rendimiento**

- `will-change: transform, opacity` puesto solo mientras el timeline vive.
- Cada `<img>` con `decoding="async"`; la primera además con
  `fetchpriority="high"` y un `<link rel="preload">` en `index.html`.
- Se precargan todas las imágenes antes de arrancar el timeline (`Promise.all`
  sobre `img.decode()`), para que el primer crossfade no salte.
- Máximo 5 slides. Más no aporta y sí cuesta memoria de GPU.

**Reduced motion**: si `prefers-reduced-motion: reduce`, no se crea timeline. Se
muestra solo la primera imagen, estática.

## 5. Timeline de entrada (`useIntroTimeline`)

Se dispara cuando se cumplen las dos condiciones: `document.fonts.ready` y las
imágenes del hero decodificadas. Hasta entonces, una cortina negra
(`position: fixed`, `z-50`) cubre la pantalla para evitar el FOUC.

Secuencia (`ease: "expo.out"` salvo donde se indique):

| t (s) | Elemento | De → a | Dur. |
|---|---|---|---|
| 0.0 | Cortina | `opacity 1 → 0`, luego `display:none` | 0.6 |
| 0.2 | Nav | `y -24, opacity 0` → `y 0, opacity 1` | 0.8 |
| 0.35 | Overline ("Serie 2026") | `opacity 0 → 1` | 0.6 |
| 0.45 | Título, por palabras | `yPercent 110 → 0` con `clipPath` inset, `stagger 0.07` | 1.1 |
| 0.9 | Párrafo | `y 20, opacity 0` → `y 0, opacity 1` | 0.8 |
| 1.05 | CTAs (2) | `y 16, opacity 0` → `y 0, opacity 1`, `stagger 0.08` | 0.7 |
| 1.15 | Stats | contadores `0 → N`, `ease: "power2.out"` | 1.4 |
| 1.2 | Tarjeta lateral | `x 40, opacity 0` → `x 0, opacity 1` | 0.9 |

Total ≈ 2.6 s. El `KenBurnsStack` arranca en `t = 0`, por debajo de la cortina,
así que cuando esta se disuelve el fondo ya está en movimiento.

Con `prefers-reduced-motion`: la cortina se quita y todo aparece con un fade
único de 0.3 s, sin desplazamientos.

## 6. Secciones

1. **Nav** — píldora flotante centrada, `backdrop-blur`, borde de 1px
   translúcido. Logo, 4 enlaces, botón "Comprar". Se encoge al hacer scroll
   (ScrollTrigger).
2. **Hero** — `h-screen`. `KenBurnsStack` + gradiente `from-black/80` a
   `transparent`. Título gigante (`clamp(3.5rem, 12vw, 11rem)`), párrafo, 2
   CTAs, fila de 3 stats, tarjeta de producto flotante abajo a la derecha.
3. **SeriesMarquee** — cinta infinita con los nombres de las series, movida con
   un tween de `xPercent` en bucle.
4. **Showcase** — 3 guitarras. Imagen pinned a la izquierda, bloque de texto
   scrolleando a la derecha; al cambiar de producto, crossfade de la imagen.
5. **Specs** — 4 cifras enormes (piezas, horas de lutier, maderas, años de
   garantía) con contadores al entrar en viewport.
6. **Gallery** — bento de 5 celdas, reveal escalonado, zoom suave al hover.
7. **FinalCTA + Footer** — titular grande, botón, enlaces.

Todas las secciones salvo el hero usan el mismo `<Reveal>`: `y 40 → 0`,
`opacity 0 → 1`, `start: "top 80%"`, `once: true`.

## 7. Contenido e imágenes

Todo el texto y las URLs viven en `src/data/site.js`. Las imágenes iniciales son
URLs remotas de Unsplash (guitarras, luthería, madera) con parámetros de ancho
`?w=1920&q=80&fm=webp`. Sustituirlas por assets propios es cambiar strings en
ese archivo y dejar los archivos en `public/hero/`.

## 8. Accesibilidad

- Contraste ≥ 4.5:1 del texto del hero sobre el gradiente, verificado sobre la
  imagen más clara del set.
- `prefers-reduced-motion` respetado en las tres capas: Ken Burns, intro y
  reveals de scroll.
- Las imágenes decorativas del hero llevan `alt=""` y `aria-hidden`.
- Navegación por teclado con foco visible en nav, CTAs y enlaces del footer.
- El marquee se detiene al recibir foco o hover.

## 9. Verificación

No hay tests unitarios: el entregable es visual. Se verifica así:

1. `npm run build` termina sin errores ni warnings.
2. La página carga en el navegador y la intro se ve completa una sola vez.
3. El hero recorre las 4 imágenes y vuelve a la primera sin corte visible (se
   observa un ciclo completo, ~30 s).
4. Con `prefers-reduced-motion: reduce` forzado, no hay movimiento en ninguna
   capa y todo el contenido sigue siendo legible.
5. Sin errores en la consola del navegador.
6. A 375 px de ancho la maqueta no desborda en horizontal.

## 10. Fuera de alcance

Backend, carrito real, CMS, i18n, tests automatizados, modo claro, vídeo mp4.

## 11. Entregable final adicional

Al terminar, un resumen sintético en esquema: qué se construyó, qué tecnología
se usó en cada capa, por qué esa y para qué sirve.
