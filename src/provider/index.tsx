'use client'

import { SessionProvider } from 'next-auth/react'

import { useSettings } from '@/hooks/useSettings'

import { SettingsContext } from './context'

export const NextAuthSessionProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export const SettingsProvider = ({ children }) => {
  const settings = useSettings()

  console.log('Providing ...')

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  )
}
