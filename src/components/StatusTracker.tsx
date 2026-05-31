import { useState } from 'react'
import { CheckCircle2, Circle, Loader2, Search } from 'lucide-react'
import { STEPS, MOCK_REPAIRS } from '../lib/status-mock-data'

export function StatusTracker() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ device: string; currentStep: number; estimatedFinish: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) {
      setError('Zadejte prosím kód zakázky.')
      return
    }
    setError(null)
    setIsLoading(true)
    setResult(null)

    // Simulace načítání
    setTimeout(() => {
      const found = MOCK_REPAIRS[code.trim().toUpperCase()]
      if (found) {
        setResult(found)
      } else {
        setError('Zakázku jsme nenašli. Zkuste kód SNP-2026-1024 jako ukázku.')
      }
      setIsLoading(false)
    }, 900)
  }

  return (
    <section id="status" className="relative py-32 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">Sledování opravy</span>
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6">
            Stav vaší opravy
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Zadejte kód zakázky a podívejte se, v jaké fázi je oprava vašeho zařízení.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="bg-card clean-border rounded-2xl p-6 elevated-shadow flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Např. SNP-2026-1024"
              className="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all"
              maxLength={20}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-accent-blue text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 gentle-animation disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              {isLoading ? 'Hledám…' : 'Zobrazit stav'}
            </button>
          </form>

          {error && (
            <div className="mt-4 text-center text-sm text-destructive">{error}</div>
          )}

          {result && (
            <div className="mt-8 bg-card clean-border rounded-2xl p-8 elevated-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-8">
                <div>
                  <p className="text-sm text-muted-foreground">Zakázka {code.toUpperCase()}</p>
                  <h3 className="text-2xl font-black text-foreground">{result.device}</h3>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Předpokládané dokončení</p>
                  <p className="text-lg font-semibold text-accent-emerald">{result.estimatedFinish}</p>
                </div>
              </div>

              <div className="relative">
                {STEPS.map((step, index) => {
                  const isDone = index < result.currentStep
                  const isActive = index === result.currentStep
                  const Icon = step.icon

                  return (
                    <div key={step.key} className="flex gap-4 pb-6 last:pb-0 relative">
                      {index < STEPS.length - 1 && (
                        <div
                          className={`absolute left-5 top-12 bottom-0 w-0.5 ${
                            isDone ? 'bg-accent-emerald' : 'bg-border'
                          }`}
                        />
                      )}
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          isDone
                            ? 'bg-accent-emerald border-accent-emerald text-white'
                            : isActive
                            ? 'bg-accent-blue border-accent-blue text-white animate-pulse'
                            : 'bg-card border-border text-muted-foreground'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 pt-1">
                        <h4
                          className={`font-bold ${
                            isActive ? 'text-accent-blue' : isDone ? 'text-foreground' : 'text-muted-foreground'
                          }`}
                        >
                          {step.label}
                          {isActive && <span className="ml-2 text-xs font-normal">(probíhá)</span>}
                        </h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Tip: vyzkoušejte ukázkové kódy <span className="font-mono">SNP-2026-1024</span>,{' '}
            <span className="font-mono">SNP-2026-1025</span> nebo{' '}
            <span className="font-mono">SNP-2026-1026</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
