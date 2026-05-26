'use client'

import { ImageWithFallback } from './figma/image-with-fallback'
import marcusPhoto from '../assets/team-member-1.png'
import sofiaPhoto from '../assets/team-member-2.png'
import jakePhoto from '../assets/team-member-3.png'
import mayaPhoto from '../assets/team-member-4.png'
import connorPhoto from '../assets/team-member-5.png'
import zaraPhoto from '../assets/team-member-6.png'
import leoPhoto from '../assets/team-member-7.png'

export function Team() {
  const teamMembers = [
    {
      name: 'Martin Novák',
      role: 'Vedoucí servisu',
      specialty: 'Specialista na opravy iPhonů',
      image: marcusPhoto,
    },
    {
      name: 'Sofie Dvořáková',
      role: 'Diagnostička',
      specialty: 'Záchrana dat a oprava po vodě',
      image: sofiaPhoto,
    },
    {
      name: 'Jakub Černý',
      role: 'Hlavní technik',
      specialty: 'Mikropájení a oprava základních desek',
      image: jakePhoto,
    },
    {
      name: 'Marie Procházková',
      role: 'Softwarová specialistka',
      specialty: 'Odblokování a obnova systému',
      image: mayaPhoto,
    },
    {
      name: 'Petr Svoboda',
      role: 'Technik tabletů',
      specialty: 'Opravy iPadů a Android tabletů',
      image: connorPhoto,
    },
    {
      name: 'Zuzana Marková',
      role: 'Technička displejů',
      specialty: 'Výměny displejů a dotykových vrstev',
      image: zaraPhoto,
    },
    {
      name: 'Lukáš Horák',
      role: 'Customer support',
      specialty: 'Komunikace se zákazníky',
      image: leoPhoto,
    },
  ]

  return (
    <div className="relative py-32 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">Lidé za SNAP</span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-8 text-foreground">
            Náš tým
          </h2>

          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Sedm certifikovaných techniků s láskou k detailu a vášní pro vrácení vašich zařízení do života.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-card clean-border rounded-2xl overflow-hidden elevated-shadow hover:scale-105 gentle-animation"
            >
              <div className="aspect-square bg-muted overflow-hidden">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-foreground mb-1">{member.name}</h3>
                <p className="text-accent-blue font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
