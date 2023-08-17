'use client'
import { createContext } from 'react'

type ModeType = 'user' | 'admin'

export const ModeContext = createContext<ModeType>('user')

const ModeProvider = ({
  mode,
  children,
}: {
  mode: ModeType
  children: React.ReactNode
}) => {
  return <ModeContext.Provider value={mode}>{children}</ModeContext.Provider>
}

export default ModeProvider
