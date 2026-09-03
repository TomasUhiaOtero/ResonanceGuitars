// Dada una frecuencia detectada, busca la cuerda de afinación estándar
// más cercana comparando en escala logarítmica (como percibe el tono el
// oído, no en Hz lineales) y calcula cuántos centésimos de semitono se
// desvía de la frecuencia exacta de esa cuerda. Un afinador de guitarra
// no necesita reconocer las 12 notas cromáticas en abstracto — solo
// necesita decir "esto es una Sol, y te falta un poco de tensión".
export default function closestString(freq, strings) {
  if (!freq) return null

  let closest = strings[0]
  let minDistance = Infinity
  for (const string of strings) {
    const distance = Math.abs(Math.log2(freq / string.freq))
    if (distance < minDistance) {
      minDistance = distance
      closest = string
    }
  }

  const cents = Math.round(1200 * Math.log2(freq / closest.freq))
  return { string: closest, cents }
}
