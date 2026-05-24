import { Hero } from './components/Hero'
import { Portfolio } from './components/Portfolio'
import { Services } from './components/Services'
import { About } from './components/About'
import { StatusTracker } from './components/StatusTracker'
import { Awards } from './components/Awards'
import { Team } from './components/Team'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="relative" role="main">
        <Hero />
        <Portfolio />
        <Services />
        <About />
        <StatusTracker />
        <Awards />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
