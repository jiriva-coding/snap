import { Smartphone, Tablet, Battery, Droplets } from 'lucide-react'
import { OptimizedGridCard } from './OptimizedGridCard'

type AccentColor = 'blue' | 'emerald' | 'purple'

export function Sluzby() {
  const cases = [
    {
      icon: Smartphone,
      device: 'iPhone 13',
      title: 'Výměna prasklého displeje',
      duration: '45 minut',
      price: 'od 2 490 Kč',
      color: 'blue' as AccentColor,
    },
    {
      icon: Battery,
      device: 'Samsung Galaxy S22',
      title: 'Výměna baterie',
      duration: '30 minut',
      price: 'od 1 290 Kč',
      color: 'emerald' as AccentColor,
    },
    {
      icon: Tablet,
      device: 'iPad Pro 11"',
      title: 'Oprava nabíjecího konektoru',
      duration: '60 minut',
      price: 'od 1 890 Kč',
      color: 'purple' as AccentColor,
    },
    {
      icon: Droplets,
      device: 'Xiaomi Redmi Note 12',
      title: 'Záchrana po polití kapalinou',
      duration: '24 hodin',
      price: 'od 990 Kč',
      color: 'blue' as AccentColor,
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

          <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-8">
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
            return (
              <OptimizedGridCard
                key={item.title}
                title={item.title}
                badge={item.device}
                accentColor={item.color}
                footerMetrics={[
                  { label: 'Doba opravy', value: item.duration },
                  { label: 'Cena', value: item.price, highlight: true }
                ]}
              >
                <Icon className="w-8 h-8" />
              </OptimizedGridCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
