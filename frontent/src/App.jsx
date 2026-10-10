import Header from './components/Header'
import Hero from './components/Hero'
import WhyUs from './components/WhyUs'
import Services from './components/Services'
import Process from './components/Process'
import Stats from './components/Stats'
import CTA from './components/CTA'
import Footer from './components/Footer'
import CameroonBanner from './components/CameroonBanner'


export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="fixed top-0 inset-x-0 z-[60]">
        <CameroonBanner />
      </div>
      <Header />
      <main>
        <Hero />
        <Stats />
        <WhyUs />
        <Services />
        <Process />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}