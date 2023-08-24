'use client'

import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'

import { getLocale } from '@/utils'

import { LocaleContext } from './context'

export const NextAuthSessionProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export const LocaleProvider = ({ children }) => {
  const [contextLocale, setContextLocale] = useState(
    getLocale({ env: 'client' }),
  )

  return (
    <LocaleContext.Provider value={{ contextLocale, setContextLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}
