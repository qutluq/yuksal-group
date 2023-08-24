import type { Dispatch, SetStateAction } from 'react'
import { createContext } from 'react'

import { getLocale } from '@/utils'

export const LocaleContext = createContext<{
  contextLocale: string
  setContextLocale: Dispatch<SetStateAction<string>>
}>({
  contextLocale: getLocale({ env: 'client' }),
  setContextLocale: () => null,
})
