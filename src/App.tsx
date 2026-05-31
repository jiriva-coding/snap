import { Hero } from './components/Hero'
import { Sluzby } from './components/Sluzby'
import { Cenik } from './components/Cenik'
import { Postup } from './components/Postup'
import { StatusTracker } from './components/StatusTracker'
import { ProcSnap } from './components/ProcSnap'
import { Recenze } from './components/Recenze'
import { Faq } from './components/Faq'
import { Kontakt } from './components/Kontakt'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="relative" role="main">
        <Hero />
        <Sluzby />
        <Cenik />
        <Postup />
        <StatusTracker />
        <ProcSnap />
        <Recenze />
        <Faq />
        <Kontakt />
      </main>
      <Footer />
    </div>
  )
}