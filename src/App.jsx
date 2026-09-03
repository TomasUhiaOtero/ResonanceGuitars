import Nav from './components/Nav.jsx'
import Hero from './sections/Hero.jsx'
import WoodsMarquee from './sections/WoodsMarquee.jsx'
import Showcase from './sections/Showcase.jsx'
import Specs from './sections/Specs.jsx'
import Gallery from './sections/Gallery.jsx'
import FinalCTA from './sections/FinalCTA.jsx'
import Footer from './sections/Footer.jsx'
import useLenis from './hooks/useLenis.js'
import useReducedMotion from './hooks/useReducedMotion.js'

export default function App() {
  const reduced = useReducedMotion()
  useLenis(!reduced)

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WoodsMarquee />
        <Showcase />
        <Specs />
        <Gallery />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
