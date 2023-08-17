'use client'
import { useLingui } from '@lingui/react'

import { translations } from './translations'

export const Translate = ({ text }: { text: string }) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { i18n } = useLingui()

  return translations()[text] ?? text
}
