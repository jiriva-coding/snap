import { Hero } from './components/hero'
import { Sluzby } from './components/sluzby'
import { Cenik } from './components/cenik'
import { Postup } from './components/postup'
import { StatusTracker } from './components/status-tracker'
import { ProcSnap } from './components/proc-snap'
import { Recenze } from './components/recenze'
import { Faq } from './components/faq'
// import { Team } from './components/team'
import { Kontakt } from './components/kontakt'
import { Footer } from './components/footer'

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
        {/* <Team /> */}
        <Kontakt />
      </main>
      <Footer />
    </div>
  )
}