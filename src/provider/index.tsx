'use client'

import { SessionProvider } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { getClientLocale } from '@/utils'

import { LocaleContext } from './context'

export const NextAuthSessionProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export const LocaleProvider = ({ children }) => {
  const [contextLocale, setContextLocale] = useState('')

  useEffect(() => {
    setContextLocale(getClientLocale())
  }, [])

  return (
    <LocaleContext.Provider value={{ contextLocale, setContextLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}
