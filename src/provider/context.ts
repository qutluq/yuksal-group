'use client'
import type { Dispatch, SetStateAction } from 'react'
import { createContext } from 'react'

import { getClientLocale } from '@/utils'

export const LocaleContext = createContext<{
  contextLocale: string
  setContextLocale: Dispatch<SetStateAction<string>>
}>({
  contextLocale: getClientLocale(),
  setContextLocale: () => null,
})
