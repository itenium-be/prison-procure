import { createContext, useContext, useState, ReactNode } from 'react'

export interface Prison {
  id: string
  nameKey: string
}

export const BELGIAN_PRISONS: Prison[] = [
  { id: 'antwerpen', nameKey: 'prisons.antwerpen' },
  { id: 'brugge', nameKey: 'prisons.brugge' },
  { id: 'gent', nameKey: 'prisons.gent' },
  { id: 'leuven', nameKey: 'prisons.leuven' },
  { id: 'mechelen', nameKey: 'prisons.mechelen' },
  { id: 'hasselt', nameKey: 'prisons.hasselt' },
  { id: 'tongeren', nameKey: 'prisons.tongeren' },
  { id: 'turnhout', nameKey: 'prisons.turnhout' },
  { id: 'dendermonde', nameKey: 'prisons.dendermonde' },
  { id: 'oudenaarde', nameKey: 'prisons.oudenaarde' },
  { id: 'ieper', nameKey: 'prisons.ieper' },
  { id: 'berkendael', nameKey: 'prisons.berkendael' },
  { id: 'vorst', nameKey: 'prisons.vorst' },
  { id: 'sintgillis', nameKey: 'prisons.sintgillis' },
  { id: 'lantin', nameKey: 'prisons.lantin' },
  { id: 'marche', nameKey: 'prisons.marche' },
  { id: 'namur', nameKey: 'prisons.namur' },
  { id: 'mons', nameKey: 'prisons.mons' },
  { id: 'jamioulx', nameKey: 'prisons.jamioulx' },
  { id: 'arlon', nameKey: 'prisons.arlon' },
  { id: 'dinant', nameKey: 'prisons.dinant' },
  { id: 'verviers', nameKey: 'prisons.verviers' },
  { id: 'haren', nameKey: 'prisons.haren' },
]

interface PrisonContextType {
  selectedPrison: Prison | null
  setSelectedPrison: (prison: Prison | null) => void
  prisons: Prison[]
}

const PrisonContext = createContext<PrisonContextType | undefined>(undefined)

export function PrisonProvider({ children }: { children: ReactNode }) {
  const [selectedPrison, setSelectedPrison] = useState<Prison | null>(BELGIAN_PRISONS[0])

  return (
    <PrisonContext.Provider value={{ selectedPrison, setSelectedPrison, prisons: BELGIAN_PRISONS }}>
      {children}
    </PrisonContext.Provider>
  )
}

export function usePrison() {
  const context = useContext(PrisonContext)
  if (context === undefined) {
    throw new Error('usePrison must be used within a PrisonProvider')
  }
  return context
}
