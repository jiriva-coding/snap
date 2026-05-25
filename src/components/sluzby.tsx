'use client'

import { Smartphone, Tablet, Battery, Droplets } from 'lucide-react'

// Statické mapování Tailwind tříd pro spolehlivou kompilaci barev v produkci
const COLOR_MAP: Record<string, { bg: string; text: string }> = {
  'accent-blue': { bg: 'bg-accent-blue/10', text: 'text-accent-blue' },
  'accent-emerald': { bg: 'bg-accent-emerald/10', text: 'text-accent-emerald' },
  'accent-purple': { bg: 'bg-accent-purple/10', text: 'text-accent-purple' },
}

export function Sluzby() {
  const cases = [
    {
      icon: Smartphone,
      device: 'iPhone 13',
      title: 'Výměna prasklého displeje',
      duration: '45 minut',
      price: 'od 2 490 Kč',
      color: 'accent-blue',
    },
    {
      icon: Battery,
      device: 'Samsung Galaxy S22',
      title: 'Výměna baterie',
      duration: '30 minut',
      price: 'od 1 290 Kč',
      color: 'accent-emerald',
    },
    {
      icon: Tablet,
      device: 'iPad Pro 11"',
      title: 'Oprava nabíjecího konektoru',
      duration: '60 minut',
      price: 'od 1 890 Kč',
      color: 'accent-purple',
    },
    {
      icon: Droplets,
      device: 'Xiaomi Redmi Note 12',
      title: 'Záchrana po polití kapalinou',
      duration: '24 hodin',
      price: 'od 990 Kč',
      color: 'accent-blue',
    },
  ]

  return (
    <section id="sluzby" className="relative py-32 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">Nejčastější opravy</span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-8">
            <span className="block">Co opravujeme</span>
          </h2>

          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Přehled nejčastějších oprav, se kterými za námi zákazníci přicházejí.
            Ceny jsou orientační — přesnou nabídku připravíme po bezplatné diagnostice.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((item) => {
            const Icon = item.icon
            const colors = COLOR_MAP[item.color] || COLOR_MAP['accent-blue']
            return (
              <div
                key={item.title}
                className="bg-card clean-border rounded-3xl p-8 elevated-shadow hover:scale-[1.02] gentle-animation"
              >
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{item.device}</p>
                    <h3 className="text-2xl font-black text-foreground mb-4">{item.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground block">Doba opravy</span>
                        <span className="font-semibold text-foreground">{item.duration}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Cena</span>
                        <span className="font-semibold text-accent-emerald">{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
