import { Circle, PackageCheck, Search, Wrench, ClipboardCheck, Package } from 'lucide-react'

export type StatusStep = {
  key: string
  label: string
  description: string
  icon: typeof Circle
}

export type RepairRecord = {
  device: string
  currentStep: number
  estimatedFinish: string
}

export const STEPS: StatusStep[] = [
  { key: 'received', label: 'Přijato', description: 'Zařízení převzato na servisu', icon: PackageCheck },
  { key: 'diagnostics', label: 'Diagnostika', description: 'Probíhá kontrola závady', icon: Search },
  { key: 'repair', label: 'Oprava', description: 'Technik pracuje na zařízení', icon: Wrench },
  { key: 'qc', label: 'Kontrola', description: 'Výstupní testování kvality', icon: ClipboardCheck },
  { key: 'ready', label: 'Hotovo', description: 'Připraveno k vyzvednutí', icon: Package },
]

export const MOCK_REPAIRS: Record<string, RepairRecord> = {
  'SNP-2026-1024': { device: 'iPhone 14 Pro — výměna displeje', currentStep: 2, estimatedFinish: '25/05/2026' },
  'SNP-2026-1025': { device: 'Samsung Galaxy S24 — výměna baterie', currentStep: 4, estimatedFinish: 'Dnes' },
  'SNP-2026-1026': { device: 'iPad Air — oprava nabíjení', currentStep: 0, estimatedFinish: '27/05/2026' },
}
