'use client'
import { createContext } from 'react'

import type { SettingsInitialized } from '@/types'

export const SettingsContext = createContext<{
  settings: SettingsInitialized
  initialized: boolean
}>(
  {} as {
    settings: SettingsInitialized
    initialized: boolean
  },
)
