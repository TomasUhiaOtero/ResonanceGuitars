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
