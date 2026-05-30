'use client'

import { motion } from 'framer-motion'
import { Menu, X, Smartphone } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Hero() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Detekce scrollování pro pozadí navigace
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Zámek scrollování při otevřeném menu
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: '#sluzby', label: 'Služby' },
    { href: '#cenik', label: 'Ceník' },
    { href: '#postup', label: 'Postup' },
    { href: '#status', label: 'Stav opravy' },
    { href: '#proc-snap', label: 'Proč SNAP' },
    { href: '#kontakt', label: 'Kontakt' },
  ]

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Animované pozadí — gradient s pohybem */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-black" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent-blue/20 rounded-full blur-[120px] float-gentle" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-emerald/15 rounded-full blur-[120px] drift-left" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-purple/10 rounded-full blur-[100px] drift-right" />
      </div>

      {/* Navigace */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 w-full z-[110]"
      >
        <div
          className={`w-full px-6 sm:px-8 lg:px-12 py-4 transition-all duration-300 ease-out ${
            isScrolled
              ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
              : 'bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Smartphone className="w-6 h-6 text-white" />
              <span className="font-bagel text-white text-2xl tracking-wider">SNAP</span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-white/80 font-medium gentle-animation hover:scale-105"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
                className="hidden sm:block bg-accent-blue text-white font-semibold px-6 py-3 rounded-md hover:opacity-90 gentle-animation cursor-pointer"
              >
                Objednat opravu
              </motion.button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden glass-effect p-3 rounded-full text-white hover:bg-white/20 gentle-animation cursor-pointer z-[120] relative"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobilní menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-md z-[80]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="md:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-black/90 backdrop-blur-xl border-l border-white/10 z-[90]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full p-6 pt-20">
          <div className="flex flex-col space-y-4 text-white">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-4 hover:bg-white/10 rounded-lg gentle-animation font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })
              setIsMobileMenuOpen(false)
            }}
            className="bg-accent-blue text-white font-semibold px-6 py-3 rounded-lg mt-8 cursor-pointer"
          >
            Objednat opravu
          </motion.button>
        </div>
      </motion.div>

      {/* Hlavní obsah hero sekce */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="inline-flex items-center gap-2 glass-effect rounded-full px-4 py-2 mb-8"
        >
          <span className="w-2 h-2 bg-accent-emerald rounded-full animate-pulse" />
          <span className="text-white/90 text-sm font-medium">Otevřeno — opravy do 24 hodin</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight text-white max-w-5xl"
        >
          <span className="block">Rychlá oprava</span>
          <span className="block">
            <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-emerald bg-clip-text text-transparent">
              mobilů a tabletů
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-8 text-lg sm:text-xl text-white/80 max-w-2xl"
        >
          Originální díly, šestiměsíční záruka a online sledování stavu vaší opravy.
          Servis značek Apple, Samsung, Xiaomi a dalších.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-accent-blue text-white font-semibold px-8 py-4 rounded-lg hover:opacity-90 gentle-animation cursor-pointer"
          >
            Objednat opravu
          </button>
          <button
            onClick={() => document.getElementById('status')?.scrollIntoView({ behavior: 'smooth' })}
            className="glass-effect text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 gentle-animation cursor-pointer"
          >
            Zjistit stav opravy
          </button>
        </motion.div>
      </div>
    </div>
  )
}
