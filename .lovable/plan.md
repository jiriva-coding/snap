# Rebrand: MOJJU → SNAP (Mobile Repair)

## Goal

Transform the existing AI film production studio website into a mobile phone and tablet repair business website for "SNAP", with all user-facing content in Czech and a live repair status tracker.

## Section-by-Section Changes

### 1. index.html

- Update `<title>` to "SNAP — Oprava mobilů a tabletů"
- Update all meta descriptions and OG tags
- Update favicon (reuse existing or placeholder)

### 2. Hero (src/components/Hero.tsx)

- Replace logo text "MOJJU" → "SNAP"
- Update navigation labels:
  - Work → Služby
  - Process → Postup
  - Capabilities → Ceník
  - Team → Tým
  - Contact → Kontakt
- Replace hero headline "AI FILM PRODUCTION WITHOUT LIMITS" → "Rychlá oprava mobilů a tabletů" (or similar repair-focused message)
- Replace CTA "Book a Call" → "Zjistit stav opravy" (links to status tracker) + "Objednat opravu"
- Replace the video background with a static tech-themed hero image (or dark gradient placeholder — video is Mojju-branded)
- Remove volume controls (no video)

### 3. Portfolio (src/components/Portfolio.tsx)

- Rename to showcase repair work / before-after gallery
- Replace YouTube embed with before/after repair images (use placeholder images)
- Update content: "Featured Work" → "Naše práce", "Hampton Commercial" → example repairs (screen replacement, battery replacement)
- Update client metadata to device types (iPhone, Samsung, iPad, etc.)

### 4. Awards (src/components/Awards.tsx)

- Repurpose into "Záruka kvality" (Quality Guarantee)
- Replace film festival awards with trust signals:
  - Rychlý servis (Fast service)
  - Originální díly (Original parts)
  - Záruka na opravu (Repair warranty)
  - 90% oprav do 24 hodin (90% repairs within 24h)
  - Doprava zdarma (Free shipping)
  - 5+ let zkušeností (5+ years experience)

### 5. About / Process (src/components/About.tsx)

- Replace 5-step film process with 5-step repair workflow:
  1. Převzetí zařízení
  2. Diagnostika + cena
  3. Odsouhlasení opravy
  4. Oprava zařízení
  5. Předání zařízení
- Remove film strip UI — replace with a clean timeline/stepper visual
- Remove storyboard gallery

### 6. Services (src/components/Services.tsx)

- Completely retheme from darkroom photo lab to clean tech repair lab
- Replace 6 film services with 6 repair services:
  - Výměna displeje
  - Výměna baterie
  - Oprava nabíjení
  - Oprava reproduktoru a mikrofonu
  - Výměna kamery
  - Oprava po vodě
- Remove clothesline/rope aesthetic — use clean cards with device imagery

### 7. Team (src/components/Team.tsx)

- Remove criminal/wanted poster theme entirely
- Replace with clean team cards showing technicians
- Rename "WANTED" → "Náš tým"
- Keep team member photos but remove mustaches, bounties, crimes
- Use realistic names and roles (technician, diagnostician, etc.)

### 8. Contact (src/components/Contact.tsx)

- Update header: "Ready to Light Up the Screen?" → "Potřebujete opravit zařízení?"
- Update form labels to Czech
- Add phone number field
- Update bottom info cards to repair-related benefits

### 9. Footer (src/components/Footer.tsx)

- "MOJJU" → "SNAP"
- Update description to repair business
- Remove AI tools section, replace with:
  - Opravované značky (Apple, Samsung, Xiaomi, Huawei, etc.)
  - Address → update to Alšova 815, 473 01 Nový Bor
- Update social links (remove specific Mojju links, use generic or #)

### 10. App.tsx / Page structure

- Keep section order but update section IDs if needed
- Add a new "Status tracker" section (either as standalone or integrated into Contact/Hero)

### 11. New Feature: Repair Status Tracker

- Create `src/components/StatusTracker.tsx`
- Simple form: user enters repair code / phone number
- Simulated lookup shows repair status (přijato → diagnostika → oprava → kontrola → hotovo)
- Use local state (no backend yet)

### 12. Language

- All user-facing strings translated to Czech
- Sentence case for headings/buttons
- Friendly, professional tone
- No placeholder text

## Technical Notes

- Keep existing design system (Bagel Fat One font, glassmorphism, Tailwind tokens)
- Keep existing animation speeds (per project memory: extremely slow)
- Keep dark theme aesthetic where present
- Reuse existing image fallbacks and component patterns
- Run linter after changes