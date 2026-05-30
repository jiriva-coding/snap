'use client'

import { Smartphone, Battery, Plug, Volume2, Camera, Droplets } from 'lucide-react'

// Statické mapování Tailwind tříd pro spolehlivou kompilaci barev v produkci
const COLOR_MAP: Record<string, { bg: string; text: string }> = {
  'accent-blue': { bg: 'bg-accent-blue/10', text: 'text-accent-blue' },
  'accent-emerald': { bg: 'bg-accent-emerald/10', text: 'text-accent-emerald' },
  'accent-purple': { bg: 'bg-accent-purple/10', text: 'text-accent-purple' },
}

export function Cenik() {
  const services = [
    {
      icon: Smartphone,
      title: 'Výměna displeje',
      description: 'Prasklé sklo nebo nefunkční LCD? Vyměníme displej s originální kvalitou.',
      price: 'od 1 490 Kč',
      color: 'accent-blue',
    },
    {
      icon: Battery,
      title: 'Výměna baterie',
      description: 'Baterie se rychle vybíjí? Vrátíme vašemu zařízení původní výdrž.',
      price: 'od 890 Kč',
      color: 'accent-emerald',
    },
    {
      icon: Plug,
      title: 'Oprava nabíjení',
      description: 'Zařízení se nenabíjí nebo špatně drží kabel? Opravíme nebo vyměníme konektor.',
      price: 'od 990 Kč',
      color: 'accent-purple',
    },
    {
      icon: Volume2,
      title: 'Reproduktor a mikrofon',
      description: 'Vás nikdo neslyší nebo neslyšíte vy? Vyčistíme nebo vyměníme audio komponenty.',
      price: 'od 690 Kč',
      color: 'accent-blue',
    },
    {
      icon: Camera,
      title: 'Výměna kamery',
      description: 'Rozmazané fotky nebo poškozené sklíčko objektivu? Obnovíme původní ostrost.',
      price: 'od 1 190 Kč',
      color: 'accent-emerald',
    },
    {
      icon: Droplets,
      title: 'Oprava po vodě',
      description: 'Spadlo vám zařízení do vody? Čím dříve přinesete, tím větší šance na záchranu dat.',
      price: 'od 990 Kč',
      color: 'accent-purple',
    },
  ]

  return (
    <section id="cenik" className="relative py-32 bg-card/30">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-purple rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">Naše služby</span>
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6 text-foreground">
            Ceník oprav
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Transparentní ceny bez skrytých poplatků. Konečnou cenu vždy potvrdíme po diagnostice.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            const colors = COLOR_MAP[service.color] || COLOR_MAP['accent-blue']
            return (
              <div
                key={service.title}
                className="group bg-background clean-border rounded-2xl p-8 elevated-shadow hover:scale-105 gentle-animation"
              >
                <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-6 group-hover:scale-110 gentle-animation`}>
                  <Icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <div className="pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">Cena</span>
                  <p className="text-xl font-black text-accent-emerald">{service.price}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
