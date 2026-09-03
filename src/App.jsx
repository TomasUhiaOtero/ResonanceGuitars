import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import Nav from './components/Nav.jsx'
import Footer from './sections/Footer.jsx'
import Home from './pages/Home.jsx'
import Guitarras from './pages/Guitarras.jsx'
import Taller from './pages/Taller.jsx'
import Soporte from './pages/Soporte.jsx'
import Afinador from './pages/Afinador.jsx'
import useLenis from './hooks/useLenis.js'
import useReducedMotion from './hooks/useReducedMotion.js'

// Lenis lleva su propio raf; al cambiar de ruta hay que resetear la
// posición nativa antes de que pinte, o la nueva página hereda el scroll
// de la anterior durante un frame.
function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const reduced = useReducedMotion()
  useLenis(!reduced)

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guitarras" element={<Guitarras />} />
        <Route path="/taller" element={<Taller />} />
        <Route path="/soporte" element={<Soporte />} />
        <Route path="/afinador" element={<Afinador />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
