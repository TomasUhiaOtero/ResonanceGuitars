# Resonance — landing de guitarras

Landing page de una sola página para una marca de guitarras artesanales. Construida con React 19, Vite, Tailwind v4, GSAP y Lenis. Incluye un hero con un bucle de imágenes en efecto Ken Burns, animaciones de entrada por scroll y soporte para `prefers-reduced-motion`.

## Puesta en marcha

```bash
npm install
npm run dev
```

Otros comandos disponibles:

```bash
npm run build    # build de producción en dist/
npm run preview  # sirve el build de producción localmente
```

## Contenido

Todo el texto y los datos de la página (marca, navegación, hero, productos, specs, galería, CTA, footer) viven en un único fichero:

```
src/data/site.js
```

Para cambiar cualquier texto, precio, estadística o lista de la landing, edita ese fichero. No hay textos hardcodeados en los componentes.

## Sustituir las imágenes del hero

1. Coloca los archivos nuevos en `public/hero/` (por ejemplo `public/hero/01.jpg`, `02.jpg`, ...).
2. Actualiza el array `hero.slides` en `src/data/site.js` para que apunte a esas rutas, en el orden en que deben aparecer en el bucle:

```js
hero: {
  // ...
  slides: ['/hero/01.jpg', '/hero/02.jpg', '/hero/03.jpg', '/hero/04.jpg'],
}
```

La primera imagen del array (`hero.slides[0]`) se precarga en `index.html` con `<link rel="preload">` para que aparezca lo antes posible. Si cambias qué imagen ocupa esa posición, actualiza también esa ruta de precarga en `index.html`.

## Ajustar el ritmo del bucle del hero

El bucle de imágenes lo gestiona el componente `KenBurnsStack`, que admite dos props:

- `hold`: segundos que cada imagen permanece a pantalla completa antes de empezar la transición a la siguiente.
- `fade`: segundos que dura el crossfade entre una imagen y la siguiente.

Sus valores por defecto están en la firma del componente (`src/components/KenBurnsStack.jsx`). Para cambiar la cadencia del bucle, sobreescríbelos pasando las props `hold` y `fade` donde se invoca `<KenBurnsStack .../>` en `src/sections/Hero.jsx`.
