const taller = {
  eyebrow: 'El taller',
  title: 'Una guitarra, pieza a pieza',
  intro: 'Sigue montándose a medida que bajas.',

  // Cada checkpoint se enciende en un tramo del scroll mientras se monta
  // la pieza correspondiente en el SVG (ver GuitarAssembly).
  checkpoints: [
    {
      title: 'Una guitarra cada vez',
      body: 'Sin cadena de montaje. Una persona, una mesa, un instrumento hasta que sale por la puerta.',
    },
    {
      title: 'Madrid, barrio de Lavapiés',
      body: 'Un local de doscientos años, con la humedad justa para curar la madera despacio.',
    },
    {
      title: 'Doce años de oficio',
      body: 'El mismo lutier desde el primer día. Nada se subcontrata ni se manda fuera.',
    },
    {
      title: 'Maderas certificadas',
      body: 'Ninguna pieza sale del taller sin papeles: procedencia legal, sin atajos.',
    },
    {
      title: 'Afinada antes de salir',
      body: 'Cada guitarra se prueba, se ajusta y se firma sobre la misma mesa donde nació.',
    },
  ],

  gallery: {
    title: 'Dentro del taller',
  },

  video: {
    title: 'Un paseo por el taller',
    body: 'Cuatro minutos entre virutas, barniz y guitarras a medio hacer.',
    poster: '/taller/tour-poster.jpg',
    src: '/taller/tour.mp4',
  },
}

export default taller
