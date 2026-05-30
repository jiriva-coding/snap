'use client'

import { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const REVIEWS = [
  {
    id: 1,
    name: 'Petr Novák',
    initials: 'PN',
    date: '15. 5. 2026',
    rating: 5,
    device: 'iPhone 14 Pro',
    text: 'Výměna displeje trvala necelé dvě hodiny. Telefon vypadá jako nový a funguje perfektně. Profesionální přístup a skvělá cena.',
  },
  {
    id: 2,
    name: 'Jana Dvořáková',
    initials: 'JD',
    date: '3. 5. 2026',
    rating: 5,
    device: 'Samsung Galaxy S23',
    text: 'Nechala jsem si vyměnit baterii. Servis byl rychlý, komunikace výborná a záruka mi dává klid. Určitě doporučuji!',
  },
  {
    id: 3,
    name: 'Martin Král',
    initials: 'MK',
    date: '22. 4. 2026',
    rating: 4,
    device: 'iPad Air',
    text: 'Oprava prasklého skla proběhla hladce. Jediný důvod pro 4 hvězdičky je, že jsem čekal o půl hodinu déle, než bylo plánováno.',
  },
  {
    id: 4,
    name: 'Lucie Benešová',
    initials: 'LB',
    date: '10. 4. 2026',
    rating: 5,
    device: 'Xiaomi 13',
    text: 'Vytopený telefon zachránili! Už jsem to chtěla vzdát, ale technici odvedli skvělou práci. Děkuji!',
  },
  {
    id: 5,
    name: 'Tomáš Horák',
    initials: 'TH',
    date: '28. 3. 2026',
    rating: 5,
    device: 'iPhone 12',
    text: 'Používám SNAP už podruhé a pokaždé jsem maximálně spokojený. Doprava zdarma je příjemný bonus.',
  },
  {
    id: 6,
    name: 'Kateřina Šikulová',
    initials: 'KŠ',
    date: '15. 3. 2026',
    rating: 5,
    device: 'Samsung Galaxy A54',
    text: 'Příjemné prostředí, milý personál a rychlé vyřízení. Není co vytknout.',
  },
]

const VISIBLE_COUNT = 3

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  )
}

export function Recenze() {
  const [startIndex, setStartIndex] = useState(0)
  const total = REVIEWS.length

  const canGoPrev = startIndex > 0
  const canGoNext = startIndex + VISIBLE_COUNT < total

  const handlePrev = () => {
    if (canGoPrev) setStartIndex((i) => i - 1)
  }

  const handleNext = () => {
    if (canGoNext) setStartIndex((i) => i + 1)
  }

  const visibleReviews = REVIEWS.slice(startIndex, startIndex + VISIBLE_COUNT)

  return (
    <section id="recenze" className="relative py-24 bg-background overflow-hidden border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-purple rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">Reference</span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6 text-foreground">
            Co říkají naši zákazníci
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Spokojenost klientů je pro nás na prvním místě.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {visibleReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                >
                  <div className="bg-card clean-border rounded-2xl p-8 elevated-shadow hover:shadow-lg gentle-animation h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <StarRating rating={review.rating} />
                      <span className="text-xs text-muted-foreground font-medium">
                        {review.date}
                      </span>
                    </div>

                    <div className="flex items-start gap-3 mb-4">
                      <Quote className="w-5 h-5 text-accent-purple shrink-0 mt-0.5" />
                      <p className="text-foreground leading-relaxed text-base">
                        {review.text}
                      </p>
                    </div>

                    <div className="mt-auto pt-4 border-t border-border flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-accent-blue/10 text-accent-blue text-sm font-bold">
                          {review.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {review.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {review.device}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                canGoPrev
                  ? 'bg-card clean-border elevated-shadow hover:shadow-lg text-foreground hover:scale-105 cursor-pointer'
                  : 'bg-muted/50 text-muted-foreground cursor-not-allowed'
              }`}
              aria-label="Předchozí recenze"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i >= startIndex && i < startIndex + VISIBLE_COUNT
                      ? 'bg-accent-purple'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                canGoNext
                  ? 'bg-card clean-border elevated-shadow hover:shadow-lg text-foreground hover:scale-105 cursor-pointer'
                  : 'bg-muted/50 text-muted-foreground cursor-not-allowed'
              }`}
              aria-label="Další recenze"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
