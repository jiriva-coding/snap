## Sekce Recenze

Přidám novou sekci „Recenze" mezi `ProcSnap` a `Faq` v `src/App.tsx`.

### Nový soubor: `src/components/recenze.tsx`

- Nadpis: „Co říkají zákazníci" + krátký podtitul
- Grid 3 sloupců (desktop) / 1 sloupec (mobil) s 6 recenzemi
- Každá karta: 5 hvězdiček, text recenze, jméno + iniciálový avatar, typ zařízení, datum (DD/MM/YYYY)
- Souhrn nahoře: průměrné hodnocení 4.9/5, počet recenzí, např. „Hodnoceno na Google"
- Styl: stejné glassmorphism karty jako jinde, accent-emerald hvězdy, slow fade-in animace
- Sentence case, čeština, realistická data (Petr N., Jana K., …, opravy iPhone/Samsung/iPad atd.)

### Úprava: `src/App.tsx`

- Import `Recenze` a vložit `<Recenze />` mezi `<ProcSnap />` a `<Faq />`

### Úprava: `src/components/Hero.tsx`

- Doplnit do navigace položku „Recenze" (zachovat existující pořadí: Služby → Postup → Stav opravy → Tým → Kontakt — vložím „Recenze" před „Kontakt") s odkazem `#recenze`

### Poznámka

Recenze budou zatím staticky v kódu (žádný backend). Pokud později budete chtít načítat z Google nebo z databáze, dám vědět jak.
