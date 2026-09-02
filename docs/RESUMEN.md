# Resonance — resumen del proyecto

Landing page de una tienda de guitarras premium, estética Apple. Prueba de
concepto de dos efectos: **entrada animada al cargar** y **hero que se mueve en
bucle como un vídeo, hecho solo con imágenes**.

## 1. Qué se construyó

```
Nav              pildora flotante con blur, se encoge al hacer scroll
Hero             pantalla completa: fondo en bucle + titular gigante + stats + tarjeta
SeriesMarquee    cinta infinita con los nombres de las series
Showcase         3 guitarras: imagen fija a la izquierda, texto scrolleando a la derecha
Specs            4 cifras enormes que cuentan desde cero al entrar en pantalla
Gallery          bento de 5 celdas con zoom suave al hover
FinalCTA         titular grande + boton
Footer           3 columnas de enlaces
```

Todo el contenido —textos, precios, rutas de imagen— vive en un único archivo,
`src/data/site.js`. Ningún componente tiene texto escrito a mano.

## 2. Tecnología: qué, por qué y para qué

| Tecnología | Dónde se usa | Por qué esa | Para qué sirve aquí |
|---|---|---|---|
| **Vite** | build y servidor de desarrollo | arranca al instante y no hay nada que configurar | `npm run dev` y recarga en caliente mientras se ajusta la animación |
| **React 19** | los 13 componentes | permite trocear la página en piezas independientes y reutilizables | cada sección se entiende y se cambia sin tocar las demás |
| **Tailwind v4** | todos los estilos | utilidades + tokens de color en un solo sitio, sin CSS suelto que se pudra | la paleta entera son 5 variables en `src/styles/index.css` |
| **GSAP 3** | `KenBurnsStack`, `useIntroTimeline`, `Counter`, `Marquee` | encadenar decenas de animaciones con tiempos exactos; con CSS puro no se puede orquestar una secuencia así | el bucle del hero y la entrada de 2,6 s |
| **ScrollTrigger** (GSAP) | `Reveal`, `Showcase`, `Specs`, `Nav` | conecta el scroll con las animaciones sin escribir listeners a mano | los reveals, el cambio de foto del showcase y los contadores |
| **Lenis** | `useLenis`, montado una vez en `App` | el scroll nativo es seco; este le da inercia | la sensación de scroll suave, sincronizada con GSAP |

Sin backend, sin router, sin gestor de estado, sin librerías de UI. Cuatro
dependencias de runtime en total: `react`, `react-dom`, `gsap`, `lenis`.

## 3. Los dos efectos que pediste

**El fade-in al cargar** — `src/hooks/useIntroTimeline.js`.
Una cortina negra tapa la pantalla hasta que las imágenes están listas. Entonces
un único timeline de GSAP encadena, en 2,6 segundos: la cortina se disuelve, el
nav baja, el titular sube palabra por palabra recortado por su línea, entran
párrafo y botones, los contadores suben desde cero y la tarjeta llega desde la
derecha. Si el usuario pide menos movimiento, todo aparece con un fundido de
0,3 s y nada se desplaza.

**El hero en bucle** — `src/components/KenBurnsStack.jsx`.
Cuatro imágenes apiladas. Un timeline infinito hace que cada una avance con un
zoom y un paneo lentos y lineales durante 6 segundos, mientras se funde con la
siguiente en 1,4 s. Los fundidos se solapan, así que nunca hay un fotograma en
negro, y el cierre del ciclo devuelve la primera imagen a su posición inicial
para que el salto no se vea. Efecto de vídeo por unos 300 KB en vez de varios
megas, y se cambia el contenido editando un array.

## 4. Cómo tocarlo

- **Textos y precios** → `src/data/site.js`.
- **Imágenes** → deja los archivos en `public/hero/`, `public/products/` o
  `public/gallery/` y actualiza las rutas en `src/data/site.js`. Para el hero,
  busca fotos de luminancia media: las muy oscuras desaparecen bajo el gradiente.
- **Ritmo del bucle** → props `hold` (segundos por imagen) y `fade` (duración
  del fundido) de `KenBurnsStack`, pasadas desde `src/sections/Hero.jsx`.
- **Tiempos de la entrada** → la tabla de posiciones en `useIntroTimeline.js`.
- **Paleta** → los cinco tokens `@theme` de `src/styles/index.css`.

## 5. Limitaciones conocidas

- `prefers-reduced-motion` está implementado en las ocho capas y verificado por
  revisión de código, pero no se pudo comprobar visualmente: el navegador
  integrado no emula esa preferencia.
- El crossfade entre fotos del showcase tampoco se verificó en movimiento por la
  misma razón; su lógica sí está revisada.
- No hay tests automatizados: el entregable es visual y así se acordó.
