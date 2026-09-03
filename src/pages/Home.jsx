import Hero from '../sections/Hero.jsx'
import WoodsMarquee from '../sections/WoodsMarquee.jsx'
import Tuner from '../sections/Tuner.jsx'
import Specs from '../sections/Specs.jsx'
import Gallery from '../sections/Gallery.jsx'
import FinalCTA from '../sections/FinalCTA.jsx'

export default function Home() {
  return (
    <main>
      <Hero />
      <WoodsMarquee />
      <Tuner />
      <Specs />
      <Gallery />
      <FinalCTA />
    </main>
  )
}
