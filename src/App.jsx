import Nav from './components/Nav.jsx'
import Hero from './sections/Hero.jsx'
import useLenis from './hooks/useLenis.js'
import useReducedMotion from './hooks/useReducedMotion.js'

export default function App() {
  const reduced = useReducedMotion()
  useLenis(!reduced)

  return (
    <main>
      <Nav />
      <Hero />
    </main>
  )
}
