import { Clock, ShieldCheck, Award, Truck, Wrench, Smile } from 'lucide-react'

// Statické mapování Tailwind tříd pro bezpečné sestavení produkčního CSS
const COLOR_MAP: Record<string, { bg: string; text: string }> = {
  'accent-blue': { bg: 'bg-accent-blue/10', text: 'text-accent-blue' },
  'accent-emerald': { bg: 'bg-accent-emerald/10', text: 'text-accent-emerald' },
  'accent-purple': { bg: 'bg-accent-purple/10', text: 'text-accent-purple' },
}

export function ProcSnap() {
  const guarantees = [
    {
      icon: Clock,
      title: 'Oprava do 24 hodin',
      description: 'Více než 90 % oprav stíháme dokončit do jednoho pracovního dne.',
      color: 'accent-blue',
    },
    {
      icon: ShieldCheck,
      title: 'Šestiměsíční záruka',
      description: 'Na všechny opravy a vyměněné díly poskytujeme záruku 6 měsíců.',
      color: 'accent-emerald',
    },
    {
      icon: Award,
      title: 'Originální díly',
      description: 'Používáme pouze originální nebo prémiové náhradní díly.',
      color: 'accent-purple',
    },
    {
      icon: Truck,
      title: 'Doprava zdarma',
      description: 'Při opravě nad 1 500 Kč hradíme dopravu zařízení tam i zpět.',
      color: 'accent-blue',
    },
    {
      icon: Wrench,
      title: '8 let zkušeností',
      description: 'Naši technici opravili přes 12 000 zařízení od roku 2018.',
      color: 'accent-emerald',
    },
    {
      icon: Smile,
      title: 'Spokojenost 98 %',
      description: 'Tolik zákazníků by nás doporučilo svým přátelům a rodině.',
      color: 'accent-purple',
    },
  ]

  return (
    <section id="proc-snap" className="relative py-20 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-purple rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">Proč SNAP</span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6 text-foreground">
            Záruka kvality
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Šest důvodů, proč svěřit svoje zařízení právě nám.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guarantees.map((item) => {
            const Icon = item.icon
            const colors = COLOR_MAP[item.color] || COLOR_MAP['accent-blue']
            return (
              <div
                key={item.title}
                className="bg-card clean-border rounded-2xl p-8 elevated-shadow hover-scale-105 gentle-animation"
              >
                <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-6`}>
                  <Icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
