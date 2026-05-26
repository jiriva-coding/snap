import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { MapPin, Phone, Mail } from 'lucide-react'

export function Kontakt() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', device: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({ title: 'Vyplňte prosím všechna povinná pole', variant: 'destructive' })
      return
    }
    setIsSubmitting(true)
    // Simulace odeslání — pro reálné odesílání připojte backend
    setTimeout(() => {
      toast({ title: 'Poptávka odeslána!', description: 'Ozveme se vám do 24 hodin.' })
      setFormData({ name: '', email: '', phone: '', device: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <section id="kontakt" className="relative py-32 bg-card/30">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">Pojďme to spravit</span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-8">
            <span className="block">Potřebujete opravit zařízení?</span>
          </h2>

          <p className="text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Napište nám, jaká je závada, a my vám obratem zašleme orientační cenu a termín.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-background clean-border rounded-3xl overflow-hidden elevated-shadow">
            <div className="bg-card/50 px-8 py-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-foreground mb-1">Poptávka opravy</h3>
                  <p className="text-muted-foreground">Odpovíme do 24 hodin v pracovní dny</p>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground font-medium">Online</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                    Jméno a příjmení *
                  </label>
                  <input
                    id="name"
                    type="text"
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all"
                    placeholder="Jan Novák"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                    Telefon
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    maxLength={20}
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all"
                    placeholder="+420 777 888 999"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    E-mail *
                  </label>
                  <input
                    id="email"
                    type="email"
                    maxLength={255}
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all"
                    placeholder="vas@email.cz"
                  />
                </div>
                <div>
                  <label htmlFor="device" className="block text-sm font-semibold text-foreground mb-2">
                    Model zařízení
                  </label>
                  <input
                    id="device"
                    type="text"
                    maxLength={100}
                    value={formData.device}
                    onChange={(e) => setFormData((prev) => ({ ...prev, device: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all"
                    placeholder="např. iPhone 13"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Popis závady *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  maxLength={1000}
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all resize-none"
                  placeholder="Popište, co je s vaším zařízením v nepořádku…"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-accent-blue text-white font-black text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? 'Odesílám…' : 'Odeslat poptávku'}
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-background clean-border rounded-2xl p-6 subtle-shadow">
              <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-accent-blue" />
              </div>
              <h4 className="font-black text-foreground mb-2">Naše pobočka</h4>
              <p className="text-muted-foreground text-sm">
                Alšova 815<br />473 01 Nový Bor
              </p>
            </div>

            <div className="bg-background clean-border rounded-2xl p-6 subtle-shadow">
              <div className="w-12 h-12 bg-accent-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-accent-emerald" />
              </div>
              <h4 className="font-black text-foreground mb-2">Telefon</h4>
              <p className="text-muted-foreground text-sm">
                +420 777 888 999<br />Po–Pá 9:00–18:00
              </p>
            </div>

            <div className="bg-background clean-border rounded-2xl p-6 subtle-shadow">
              <div className="w-12 h-12 bg-accent-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-accent-purple" />
              </div>
              <h4 className="font-black text-foreground mb-2">E-mail</h4>
              <p className="text-muted-foreground text-sm">
                servis@snap-oprava.cz<br />Odpovídáme do 24 hodin
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
