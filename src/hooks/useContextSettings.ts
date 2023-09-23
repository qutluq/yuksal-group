import { useContext } from 'react'

import { SettingsContext } from '@/provider/context'

export const useContextSettings = () => {
  return useContext(SettingsContext)
}
