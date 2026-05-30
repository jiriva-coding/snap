'use client'

// Statická mapa barev pozadí pro bezpečné fungování Tailwind JIT kompilátoru
const BG_COLORS: Record<string, string> = {
  'accent-blue': 'bg-accent-blue',
  'accent-emerald': 'bg-accent-emerald',
  'accent-purple': 'bg-accent-purple',
}

export function Postup() {
  const steps = [
    {
      number: '01',
      title: 'Převzetí zařízení',
      description: 'Přineste zařízení osobně nebo nám ho zašlete poštou — předtištěný štítek vystavíme zdarma.',
      color: 'accent-blue',
    },
    {
      number: '02',
      title: 'Diagnostika a cena',
      description: 'Bezplatná diagnostika do 2 hodin. Dostanete přesnou cenovou nabídku ke schválení.',
      color: 'accent-emerald',
    },
    {
      number: '03',
      title: 'Odsouhlasení opravy',
      description: 'Pokračujeme až po vašem písemném souhlasu. Nikdy nepřekročíme dohodnutou cenu.',
      color: 'accent-purple',
    },
    {
      number: '04',
      title: 'Profesionální oprava',
      description: 'Naši technici opravu provedou originálními nebo prémiovými náhradními díly.',
      color: 'accent-blue',
    },
    {
      number: '05',
      title: 'Předání zařízení',
      description: 'Po výstupní kontrole zařízení vyzvednete osobně, nebo vám ho zašleme zpět zdarma.',
      color: 'accent-emerald',
    },
  ]

  return (
    <section id="postup" className="relative py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">Jak to u nás funguje</span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6 text-foreground">
            Postup opravy
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Pět jednoduchých kroků od převzetí až po předání opraveného zařízení.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Svislá čára spojující kroky */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-border hidden sm:block" />

            <div className="space-y-8">
              {steps.map((step) => {
                const bgClass = BG_COLORS[step.color] || 'bg-accent-blue'
                return (
                  <div key={step.number} className="relative flex gap-6 items-start">
                    <div
                      className={`flex-shrink-0 w-16 h-16 rounded-2xl ${bgClass} text-white flex items-center justify-center font-black text-xl elevated-shadow z-10`}
                    >
                      {step.number}
                    </div>
                    <div className="flex-1 bg-card clean-border rounded-2xl p-6 elevated-shadow">
                      <h3 className="text-2xl font-black text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
