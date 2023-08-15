'use client'
import { i18n } from '@lingui/core'
import { I18nProvider as Provider } from '@lingui/react'
import { useEffect, useState } from 'react'
import store from 'store'

import { messages } from '@/locales'
import { useAppSelector } from '@/redux/hooks'

const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeLocale, setActiveLocale] = useState('')
  const locale = useAppSelector((state) => state.localeManager.locale)
  useEffect(() => {
    if (locale === activeLocale) return

    i18n.load(locale, messages[locale])
    i18n.activate(locale)
    setActiveLocale(locale)
    store.set('locale', locale)
  }, [locale])

  return <Provider i18n={i18n}>{children}</Provider>
}

export default I18nProvider
