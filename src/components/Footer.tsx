import { Smartphone } from 'lucide-react'

export function Footer() {
  const brands = [
    'Apple',
    'Samsung',
    'Xiaomi',
    'Huawei',
    'Google Pixel',
    'OnePlus',
    'Honor',
    'Sony',
    'Motorola',
    'Realme',
    'Nokia',
    'Oppo',
  ]

  return (
    <footer className="relative py-20 bg-foreground text-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="col-span-1 md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-7 h-7 text-background" />
              <span className="font-bagel text-background text-3xl tracking-wider">SNAP</span>
            </div>
            <p className="text-background/70 leading-relaxed mb-6">
              Profesionální servis mobilních telefonů a tabletů s důrazem na rychlost,
              kvalitu a férové ceny.
            </p>
            <div className="text-background/70 text-sm leading-relaxed">
              <p>Alšova 815</p>
              <p>473 01 Nový Bor</p>
              <p className="mt-2">+420 777 888 999</p>
              <p>servis@snap-oprava.cz</p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-8">
            <h4 className="font-black text-2xl text-background mb-4">Opravujeme značky</h4>
            <p className="text-background/70 text-base mb-8 leading-relaxed">
              Servisujeme prakticky všechny rozšířené značky mobilních telefonů a tabletů.
              Pokud vaši značku nevidíte v seznamu, neváhejte se nás zeptat.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {brands.map((brand) => (
                <div
                  key={brand}
                  className="text-background/80 hover:text-background gentle-animation text-sm font-medium"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-background/70 mb-4 md:mb-0">
              © 2026 SNAP. Všechna práva vyhrazena.
            </div>
            <div className="text-sm text-background/70">
              Otevřeno Po–Pá 9:00–18:00, So 9:00–12:00
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
