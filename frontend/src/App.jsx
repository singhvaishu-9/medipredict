/**
 * App.jsx — Root application layout.
 * Light pink/rose background with Navbar + Footer.
 */
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Diabetes from './pages/Diabetes'
import Heart from './pages/Heart'
import Parkinsons from './pages/Parkinsons'
import BreastCancer from './pages/BreastCancer'
import Liver from './pages/Liver'
import Kidney from './pages/Kidney'
import Stroke from './pages/Stroke'
import Pneumonia from './pages/Pneumonia'
import Anemia from './pages/Anemia'
import LearnMore from './pages/LearnMore'
import About from './pages/About'

function App() {
  return (
    <div className="min-h-screen flex flex-col font-poppins">
      <Navbar />

      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diabetes" element={<Diabetes />} />
          <Route path="/heart" element={<Heart />} />
          <Route path="/parkinsons" element={<Parkinsons />} />
          <Route path="/breast-cancer" element={<BreastCancer />} />
          <Route path="/liver" element={<Liver />} />
          <Route path="/kidney" element={<Kidney />} />
          <Route path="/stroke" element={<Stroke />} />
          <Route path="/pneumonia" element={<Pneumonia />} />
          <Route path="/anemia" element={<Anemia />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
