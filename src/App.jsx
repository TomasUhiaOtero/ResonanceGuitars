import Nav from './components/Nav.jsx'
import KenBurnsStack from './components/KenBurnsStack.jsx'
import useLenis from './hooks/useLenis.js'
import useReducedMotion from './hooks/useReducedMotion.js'
import site from './data/site.js'

export default function App() {
  const reduced = useReducedMotion()
  useLenis(!reduced)

  return (
    <main>
      <Nav />
      <section className="relative h-screen">
        <KenBurnsStack images={site.hero.slides} />
      </section>
    </main>
  )
}
