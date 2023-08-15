'use client'
import { i18n } from '@lingui/core'
import { I18nProvider as Provider } from '@lingui/react'

import { messages } from '@/locales'

const I18nProvider = ({
  locale,
  children,
}: {
  locale: string
  children: React.ReactNode
}) => {
  i18n.load(locale, messages[locale])
  i18n.activate(locale)
  return <Provider i18n={i18n}>{children}</Provider>
}

export default I18nProvider
