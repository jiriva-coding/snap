'use client'

import { HelpCircle, MessageSquare } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

// Databáze otázek a odpovědí lokalizovaná do češtiny
const FAQ_ITEMS = [
  {
    value: 'tracker',
    question: 'Jak funguje online sledování stavu opravy?',
    answer: 'Při předání zařízení do našeho servisu obdržíte unikátní kód opravy (např. SNAP-1234). Tento kód stačí zadat do pole v sekci Sledování stavu na našem webu. Okamžitě se vám zobrazí aktuální fáze opravy – od přijetí, přes diagnostiku, objednání dílů až po finální testování a připravení k vyzvednutí. O každém postupu vás navíc automaticky informujeme SMS zprávou.',
  },
  {
    value: 'duration',
    question: 'Jak dlouho oprava telefonu nebo tabletu trvá?',
    answer: 'Většinu standardních oprav, jako je výměna prasklého displeje nebo opotřebené baterie, zvládáme dokončit do 24 hodin od přijetí. V případě menších zásahů je po dohodě možná oprava na počkání (do 2 hodin). U složitějších závad (např. oprava základní desky po vytopení) nebo při čekání na méně obvyklý náhradní díl se doba pohybuje mezi 2 až 5 pracovními dny.',
  },
  {
    value: 'parts',
    question: 'Používáte originální náhradní díly?',
    answer: 'Ano, zakládáme si na kvalitě a spolehlivosti. Používáme výhradně originální komponenty nebo certifikované náhradní díly nejvyšší OEM třídy. Díky tomu si vaše zařízení uchová své původní zobrazovací i dotykové vlastnosti a opravený díl bude mít stejnou životnost jako nový tovární kus.',
  },
  {
    value: 'warranty',
    question: 'Jakou záruku na provedenou opravu a díly poskytujete?',
    answer: 'Na všechny provedené servisní úkony i vyměněné náhradní díly poskytujeme plnou záruku v délce 6 měsíců. Věříme kvalitě naší práce i dodávaných součástek, a pokud by se v této lhůtě objevil jakýkoliv problém spojený s opravou, vyřešíme jej pro vás zdarma a prioritně.',
  },
  {
    value: 'diagnostics',
    question: 'Kolik stojí diagnostika zařízení a co když se oprava nevyplatí?',
    answer: 'Diagnostika závady je u nás zcela zdarma, pokud se následně rozhodnete pro realizaci opravy. V případě, že technik odhalí rozsáhlé poškození a vy se rozhodnete z jakéhokoliv důvodu v opravě nepokračovat (např. pokud by se finančně nevyplatila), hradíte pouze minimální poplatek 350 Kč za čas strávený rozebráním zařízení, diagnostikou a opětovným složením.',
  },
  {
    value: 'booking',
    question: 'Musím se na servis předem objednat?',
    answer: 'Není to nutné, na naši pobočku v Novém Boru můžete přijít kdykoliv v otevírací době (Po–Pá od 9:00 do 18:00). Pokud se však chcete vyhnout čekání a mít jistotu, že budeme mít potřebný náhradní díl ihned skladem, doporučujeme vyplnit poptávkový formulář níže nebo nám předem zavolat. My vám díl zarezervujeme a opravu naplánujeme na konkrétní čas.',
  },
  {
    value: 'delivery',
    question: 'Jakým způsobem mohu zařízení k opravě doručit a jak mi bude vráceno?',
    answer: 'Máte dvě možnosti. Zařízení můžete přinést osobně na naši pobočku, nebo využít naši bezpečnou přepravu. Pro všechny opravy nad 1 500 Kč nabízíme doručení tam i zpět zcela zdarma. Po vyplnění poptávky vám zašleme kód pro bezplatné odeslání přes Zásilkovnu, nebo domluvíme vyzvednutí kurýrem přímo u vás doma. Opravené zařízení vám pak zašleme zpět pečlivě zabalené.',
  },
  {
    value: 'water',
    question: 'Opravujete i vytopené telefony poškozené kapalinou?',
    answer: 'Ano, tyto opravy běžně provádíme. V případě kontaktu s kapalinou je nejdůležitější rychlost. Zařízení okamžitě vypněte, nepokoušejte se ho nabíjet, ani ho nesušte fénem (teplo může oxidaci urychlit). Co nejdříve ho doručte k nám. Telefon rozebereme, vyčistíme ultrazvukovou technologií, odstraníme oxidaci z desky a teprve poté diagnostikujeme, které součástky bude potřeba vyměnit.',
  },
]
export function Faq() {
  return (
    <section id="faq" className="relative py-24 bg-background overflow-hidden border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-purple rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">Časté dotazy</span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
            Často kladené otázky
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Vše, co potřebujete vědět o opravách, sledování stavu a zárukách v servisu SNAP.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQ_ITEMS.map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="bg-card/40 border border-border rounded-2xl px-6 py-2 hover:border-accent-blue/30 data-[state=open]:border-accent-blue/50 data-[state=open]:bg-card/85 gentle-animation border-b-0"
              >
                <AccordionTrigger className="text-lg sm:text-xl font-bold text-foreground py-4 hover:no-underline [&[data-state=open]>svg]:text-accent-blue">
                  <div className="flex items-center gap-3 text-left">
                    <HelpCircle className="w-5 h-5 text-muted-foreground shrink-0" />
                    <span>{item.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6 pt-2">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-16 bg-card/40 border border-border rounded-3xl p-8 text-center max-w-2xl mx-auto">
            <div className="inline-flex w-12 h-12 bg-accent-purple/10 rounded-full items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-accent-purple" />
            </div>
            <h3 className="text-2xl font-black text-foreground mb-2">Nenašli jste odpověď na vaši otázku?</h3>
            <p className="text-muted-foreground mb-6">
              Náš tým je připraven vám pomoci. Kontaktujte nás přímo nebo nám zašlete nezávaznou poptávku.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-accent-blue hover:opacity-90 font-bold text-white transition-all transform hover:-translate-y-0.5 subtle-shadow"
            >
              Napište nám
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
