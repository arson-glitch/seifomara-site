import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { readStore, writeStore } from './storage'

type SoundCtx = { enabled: boolean; toggle: () => void }

const Ctx = createContext<SoundCtx>({ enabled: false, toggle: () => {} })

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(() => readStore('sound') === 'on')
  const toggle = useCallback(() => {
    setEnabled((on) => {
      writeStore('sound', on ? 'off' : 'on')
      return !on
    })
  }, [])
  const value = useMemo(() => ({ enabled, toggle }), [enabled, toggle])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useSound = () => useContext(Ctx)
