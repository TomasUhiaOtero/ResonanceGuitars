import useLenis from './hooks/useLenis.js'
import useReducedMotion from './hooks/useReducedMotion.js'

export default function App() {
  const reduced = useReducedMotion()
  useLenis(!reduced)

  return (
    <main className="min-h-[300vh] grid place-items-center">
      <h1 className="text-6xl">Resonance</h1>
    </main>
  )
}
