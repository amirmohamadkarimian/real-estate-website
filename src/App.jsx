import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import FeatureStrip from './components/FeatureStrip.jsx'
import FeaturedProperties from './components/FeaturedProperties.jsx'
import AboutSplit from './components/AboutSplit.jsx'
import CtaBanner from './components/CtaBanner.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <main>
        <Hero />
        <FeatureStrip />
        <FeaturedProperties />
        <AboutSplit />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}
