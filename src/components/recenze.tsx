'use client'

import { Star, Quote } from 'lucide-react'

type Recenze = {
  jmeno: string
  zarizeni: string
  text: string
  datum: string
  hodnoceni: number
}

const recenze: Recenze[] = [
  {
    jmeno: 'Petr Novák',
    zarizeni: 'iPhone 13 — výměna displeje',
    text: 'Rozbil jsem displej v pátek odpoledne, v sobotu ráno jsem měl telefon zpátky jako nový. Skvělá komunikace a férová cena.',
    datum: '14/03/2026',
    hodnoceni: 5,
  },
  {
    jmeno: 'Jana Krásná',
    zarizeni: 'Samsung Galaxy S22 — baterie',
    text: 'Telefon mi vydržel sotva půl dne. Po výměně baterie funguje jako nový. Vše hotovo na počkání, moc děkuji!',
    datum: '02/04/2026',
    hodnoceni: 5,
  },
  {
    jmeno: 'Martin Dvořák',
    zarizeni: 'iPad Air — nabíjecí konektor',
    text: 'Profesionální přístup, jasně vysvětlili závadu i cenu předem. Sledování stavu opravy online je super věc.',
    datum: '21/04/2026',
    hodnoceni: 5,
  },
  {
    jmeno: 'Eva Horáková',
    zarizeni: 'iPhone 12 — oprava po vodě',
    text: 'Telefon mi spadl do umyvadla a už jsem ho oplakala. Kluci v SNAP ho oživili a všechna data zůstala. Doporučuji!',
    datum: '05/05/2026',
    hodnoceni: 5,
  },
  {
    jmeno: 'Tomáš Beneš',
    zarizeni: 'Xiaomi Redmi Note — displej',
    text: 'Cena nižší než u konkurence, oprava do druhého dne. Originální díl, šest měsíců záruka. Vše, jak má být.',
    datum: '18/05/2026',
    hodnoceni: 4,
  },
  {
    jmeno: 'Lucie Marková',
    zarizeni: 'iPad Pro — výměna skla',
    text: 'Velmi milý přístup, vše hezky vysvětlili. Tablet vypadá jako z krabice. Příště zase k vám.',
    datum: '24/05/2026',
    hodnoceni: 5,
  },
]

function iniciály(jmeno: string) {
  return jmeno
    .split(' ')
    .map((s) => s[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function Recenze() {
  const prumer = (
    recenze.reduce((s, r) => s + r.hodnoceni, 0) / recenze.length
  ).toFixed(1).replace('.', ',')

  return (
    <section id="recenze" className="relative py-20 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">Recenze</span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 text-foreground">
            Co říkají zákazníci
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
            Důvěřuje nám přes 12 000 zákazníků. Tady je pár jejich zkušeností.
          </p>

          <div className="inline-flex items-center gap-4 bg-card clean-border rounded-2xl px-6 py-4 elevated-shadow">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent-emerald text-accent-emerald" />
              ))}
            </div>
            <div className="text-left">
              <div className="text-2xl font-black text-foreground leading-none">{prumer} / 5</div>
              <div className="text-sm text-muted-foreground">{recenze.length * 142} hodnocení</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recenze.map((r) => (
            <div
              key={r.jmeno}
              className="relative bg-card clean-border rounded-2xl p-8 elevated-shadow hover:scale-105 gentle-animation"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-accent-blue/20" />

              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < r.hodnoceni
                        ? 'fill-accent-emerald text-accent-emerald'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>

              <p className="text-foreground leading-relaxed mb-6">„{r.text}"</p>

              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="w-11 h-11 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue font-black">
                  {iniciály(r.jmeno)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-foreground truncate">{r.jmeno}</div>
                  <div className="text-xs text-muted-foreground truncate">{r.zarizeni}</div>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">{r.datum}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
