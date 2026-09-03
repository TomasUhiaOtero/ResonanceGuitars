// Contenido de /soporte. Inspirado en el patrón "motivo de consulta primero"
// de Thomann (categorías → formulario con el asunto ya preseleccionado) y
// en las tarjetas de ayuda de Apple Support.
const soporte = {
  eyebrow: 'Soporte',
  title: '¿En qué podemos ayudarte?',
  intro: 'Pedidos, garantías, mantenimiento o una visita al taller — cuéntanos qué necesitas y te contestamos en menos de 24 horas laborables.',

  categories: [
    {
      id: 'pedido',
      title: 'Pedidos y envíos',
      body: 'Estado de un pedido, plazos de entrega, cambios o devoluciones.',
    },
    {
      id: 'garantia',
      title: 'Garantía y reparaciones',
      body: 'Tu guitarra tiene los 12 años de garantía de fábrica — aquí gestionamos cualquier incidencia.',
    },
    {
      id: 'asesoramiento',
      title: 'Asesoramiento sobre guitarras',
      body: 'Dudas antes de comprar: maderas, acción de las cuerdas, diferencias entre modelos.',
    },
    {
      id: 'visita',
      title: 'Visitas al taller',
      body: 'Reserva un hueco para probar guitarras o ver el proceso de construcción en Lavapiés.',
    },
    {
      id: 'otro',
      title: 'Otro asunto',
      body: 'Cualquier otra cosa que no encaje arriba — la leemos igual.',
    },
  ],

  faqs: [
    {
      q: '¿Cuánto tarda en llegar mi guitarra?',
      a: 'Entre 3 y 5 días laborables dentro de la península. Cada guitarra se revisa y se afina justo antes de salir del taller, así que el envío no empieza hasta que pasa esa última inspección.',
    },
    {
      q: '¿Qué cubre la garantía de 12 años?',
      a: 'Defectos de construcción y de materiales: grietas por fallos de encolado, trastes mal asentados, electrónica defectuosa en los modelos que la llevan. No cubre el desgaste normal (cuerdas, trastes gastados por el uso) ni daños por golpes o humedad extrema.',
    },
    {
      q: '¿Puedo devolver una guitarra si no me convence?',
      a: 'Sí, tienes 30 días desde la entrega para devolverla sin dar explicaciones, siempre que vuelva en las mismas condiciones en las que salió del taller.',
    },
    {
      q: '¿Hacéis envíos fuera de España?',
      a: 'Por ahora solo enviamos dentro de la Unión Europea. Si quieres una guitarra fuera de la UE, escríbenos y vemos opciones caso por caso.',
    },
    {
      q: '¿Puedo visitar el taller sin comprar nada?',
      a: 'Claro. El taller abre de martes a sábado, sin cita previa — pásate, prueba las guitarras que quieras y pregunta lo que necesites.',
    },
    {
      q: '¿Reparáis guitarras que no sean vuestras?',
      a: 'Sí, hacemos ajustes y reparaciones de cualquier marca: cambio de trastes, acción, electrónica, grietas. Escríbenos con fotos y una descripción para darte un presupuesto.',
    },
  ],

  contact: {
    address: 'Calle del Oso 14, 28012 Madrid (Lavapiés)',
    hours: 'Martes a sábado, 10:00–14:00 y 16:00–20:00',
    phone: '+34 910 123 456',
    email: 'hola@resonance-guitars.example',
  },

  form: {
    success: {
      title: 'Mensaje enviado',
      body: 'Gracias — lo hemos recibido y te contestamos por email en menos de 24 horas laborables.',
    },
  },
}

export default soporte
