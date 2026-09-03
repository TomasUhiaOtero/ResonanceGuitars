// Catálogo de la página /guitarras. Aurora, Basalt y Vela son los mismos
// modelos que aparecen en la home (site.js) — mismas fotos y precios,
// marcados `featured` para heredar el tag rojo de la card del hero.
// Una pista por familia, no por modelo — no hay una grabación real de
// cada guitarra del catálogo, así que reutilizar un clip representativo
// por categoría es más honesto que fingir 12 grabaciones distintas.
const AUDIO_BY_CATEGORY = {
  clasicas: '/audio/clasicas.mp3',
  acusticas: '/audio/acusticas.mp3',
  electroacusticas: '/audio/electroacusticas.mp3',
  electricas: '/audio/electricas.mp3',
}

export const categories = [
  {
    slug: 'clasicas',
    name: 'Clásicas',
    description: 'Cuerdas de nylon, cajas ligeras, silencio de fondo. Para quien empieza o para quien vuelve.',
    audio: AUDIO_BY_CATEGORY.clasicas,
  },
  {
    slug: 'acusticas',
    name: 'Acústicas',
    description: 'Cuerdas de acero y una caja que llena la habitación sin enchufar nada.',
    audio: AUDIO_BY_CATEGORY.acusticas,
  },
  {
    slug: 'electroacusticas',
    name: 'Electroacústicas',
    description: 'El cuerpo de una acústica con la electrónica lista para subir a un escenario.',
    audio: AUDIO_BY_CATEGORY.electroacusticas,
  },
  {
    slug: 'electricas',
    name: 'Eléctricas',
    description: 'Cuerpo sólido, pastillas, amplificador. El resto lo pones tú.',
    audio: AUDIO_BY_CATEGORY.electricas,
  },
]

const rawGuitars = [
  // Clásicas
  {
    id: 'vela',
    category: 'clasicas',
    name: 'Vela',
    price: '5.100 €',
    note: 'Cedro macizo, abanico tradicional de siete varetas. La más silenciosa de tocar.',
    image: '/products/03.jpg',
    featured: true,
  },
  {
    id: 'alba',
    category: 'clasicas',
    name: 'Alba',
    price: '3.980 €',
    note: 'Palosanto de río y tapa de cedro. Diapasón de ébano, acabado mate.',
    image: '/products/guitars/clasica-02.jpg',
  },
  {
    id: 'sombra',
    category: 'clasicas',
    name: 'Sombra',
    price: '4.450 €',
    note: 'Caoba maciza y filete de hueso. Construida para el flamenco, no para la vitrina.',
    image: '/products/guitars/clasica-03.jpg',
  },

  // Acústicas
  {
    id: 'basalt',
    category: 'acusticas',
    name: 'Basalt',
    price: '3.750 €',
    note: 'Palosanto de la India y tapa de abeto Sitka. Grave profundo, agudos que no cortan.',
    image: '/products/02.jpg',
    featured: true,
  },
  {
    id: 'bruma',
    category: 'acusticas',
    name: 'Bruma',
    price: '3.590 €',
    note: 'Abeto europeo y aros de arce ondado. Proyección clara incluso sin pastilla.',
    image: '/products/guitars/acustica-02.jpg',
  },
  {
    id: 'cauce',
    category: 'acusticas',
    name: 'Cauce',
    price: '4.120 €',
    note: 'Nogal americano, cuerpo dreadnought. Pensada para acompañar, no para lucirse.',
    image: '/products/guitars/acustica-03.jpg',
  },

  // Electroacústicas
  {
    id: 'nomada',
    category: 'electroacusticas',
    name: 'Nómada',
    price: '3.290 €',
    note: 'Corte cutaway y ecualizador de tres bandas. La que se lleva de gira.',
    image: '/products/guitars/electroacustica-01.jpg',
  },
  {
    id: 'eco',
    category: 'electroacusticas',
    name: 'Eco',
    price: '3.750 €',
    note: 'Tapa de abeto con pastilla piezo bajo el puente. Suena acústica, se porta como eléctrica.',
    image: '/products/guitars/electroacustica-02.jpg',
  },
  {
    id: 'marea',
    category: 'electroacusticas',
    name: 'Marea',
    price: '4.680 €',
    note: 'Cuerpo auditorium con preamplificador integrado. Grave contenido, agudos dóciles al micrófono.',
    image: '/products/guitars/electroacustica-03.jpg',
  },

  // Eléctricas
  {
    id: 'aurora',
    category: 'electricas',
    name: 'Aurora',
    price: '4.290 €',
    note: 'Cuerpo hueco de aliso y pastillas bobinadas a mano. Se rompe con elegancia cuando aprietas.',
    image: '/products/01.jpg',
    featured: true,
  },
  {
    id: 'deriva',
    category: 'electricas',
    name: 'Deriva',
    price: '4.590 €',
    note: 'Cuerpo sólido de fresno, mástil de arce atornillado. Diseñada para pedales, no para salón.',
    image: '/products/guitars/electrica-02.jpg',
  },
  {
    id: 'solsticio',
    category: 'electricas',
    name: 'Solsticio',
    price: '5.350 €',
    note: 'Dos humbuckers y puente fijo. Sustain largo, afinación que no se mueve.',
    image: '/products/guitars/electrica-03.jpg',
  },
]

// La pista de audio se deriva de la categoría en vez de repetirla a mano
// en cada una de las 12 guitarras — una sola fuente de verdad (el mapa de
// arriba), cero riesgo de que un modelo se quede con el clip equivocado.
export const guitars = rawGuitars.map((g) => ({ ...g, audio: AUDIO_BY_CATEGORY[g.category] }))

// Selección para el carousel interactivo de cabecera: una por familia más
// dos extra, en el orden en que se listan los paneles.
export const featuredIds = ['vela', 'aurora', 'basalt', 'nomada', 'deriva', 'sombra']
export const featured = featuredIds.map((id) => guitars.find((g) => g.id === id))
