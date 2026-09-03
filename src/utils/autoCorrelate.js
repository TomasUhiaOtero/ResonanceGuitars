// Detección de tono por autocorrelación (ACF), la técnica estándar para
// encontrar la frecuencia fundamental de una señal monofónica — una sola
// cuerda sonando — en el rango grave de una guitarra (82–330 Hz). Un
// AnalyserNode leído como espectro de frecuencias (getByteFrequencyData)
// no tiene resolución suficiente ahí abajo sin una FFT enorme; la
// autocorrelación trabaja en el dominio del tiempo y no tiene ese
// problema. Es la misma técnica de referencia que usan la mayoría de
// afinadores web (basada en el gist público de Chris Wilson).
export default function autoCorrelate(buffer, sampleRate) {
  const SIZE = buffer.length

  let rms = 0
  for (let i = 0; i < SIZE; i++) rms += buffer[i] * buffer[i]
  rms = Math.sqrt(rms / SIZE)
  if (rms < 0.01) return null // silencio o ruido de fondo, no hay nota que detectar

  // Recorta el silencio de los extremos del buffer antes de correlar.
  let start = 0
  let end = SIZE - 1
  const threshold = 0.2
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buffer[i]) < threshold) {
      start = i
      break
    }
  }
  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buffer[SIZE - i]) < threshold) {
      end = SIZE - i
      break
    }
  }

  const trimmed = buffer.slice(start, end)
  const n = trimmed.length
  if (n < 2) return null

  const c = new Array(n).fill(0)
  for (let lag = 0; lag < n; lag++) {
    for (let i = 0; i < n - lag; i++) {
      c[lag] += trimmed[i] * trimmed[i + lag]
    }
  }

  // El primer mínimo local descarta el pico trivial en lag 0.
  let d = 0
  while (d < n - 1 && c[d] > c[d + 1]) d++

  let maxVal = -1
  let maxPos = -1
  for (let i = d; i < n; i++) {
    if (c[i] > maxVal) {
      maxVal = c[i]
      maxPos = i
    }
  }
  if (maxPos <= 0) return null

  // Interpolación parabólica sobre el pico y sus vecinos: afina la
  // estimación por debajo de la resolución de una sola muestra.
  const x1 = c[maxPos - 1] ?? c[maxPos]
  const x2 = c[maxPos]
  const x3 = c[maxPos + 1] ?? c[maxPos]
  const a = (x1 + x3 - 2 * x2) / 2
  const b = (x3 - x1) / 2
  const refinedLag = a ? maxPos - b / (2 * a) : maxPos

  return refinedLag > 0 ? sampleRate / refinedLag : null
}
