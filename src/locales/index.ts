import { messages as messagesEn } from '@/locales/en/messages'
import { messages as messagesRu } from '@/locales/ru/messages'
import { messages as messagesUg } from '@/locales/ug/messages'

import linguiSettings from '../../lingui.config'

export const messages = {
  en: messagesEn,
  ru: messagesRu,
  ug: messagesUg,
}

export const localeLanguages = {
  en: 'English',
  ru: 'Русский',
  ug: 'Уйғурчә',
}

export const locales = linguiSettings.locales
export const defaultLocale = linguiSettings.sourceLocale
