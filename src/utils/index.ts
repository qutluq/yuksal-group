import { cache } from 'react'

import { localeLanguages } from '@/locales'

import nextConfig from '../../next.config'
import { translations } from './translations'

export const classNames = (...classes: (string | boolean)[]) =>
  classes.filter(Boolean).join(' ')

export const setSearchParamsLang = (searchParams, selectedLanguage: string) => {
  let query = ''
  let separator = ''
  for (const [key, value] of searchParams.entries()) {
    if (query === '') {
      query = '?'
    } else {
      separator = '&'
    }

    if (key === 'lang') {
      query = `${query}${separator}lang=${selectedLanguage}`
    } else {
      query = `${query}${separator}${key}=${value}`
    }
  }

  if (query === '') {
    query = `?lang=${selectedLanguage}`
  }

  return query
}

export const translate = cache((text: string, lang: string) => {
  const translation = translations[slugify(text)]
  return translation ? translation[lang] : text
})

export const toUppercase = (txt: string) => txt.toUpperCase()

export const toTitleCase = (txt: string) =>
  txt
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

export const getLangSearchParam = (searchParams) =>
  typeof searchParams.lang === 'string'
    ? localeValid(searchParams.lang)
      ? searchParams.lang
      : getLocale({ env: 'server' })
    : getLocale({ env: 'server' })

export const localeValid = (lang) => (localeLanguages[lang] ? true : false)

export const getLocale = ({ env }: { env: 'client' | 'server' }) =>
  env === 'client'
    ? getCookie('NEXT_LOCALE') || nextConfig.i18n?.defaultLocale || 'en'
    : nextConfig.i18n?.defaultLocale || 'en'

export const getCookie = (name) => {
  if (!document) {
    return nextConfig.i18n?.defaultLocale || 'en'
  }
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts[1].split(';').shift()
}

export const getPaginationText = (page, limit, total, short = false) =>
  short
    ? `${total > 0 ? (page - 1) * limit + 1 : 0}/${
        page * limit > total ? total : page * limit
      } of ${total} `
    : `Showing ${total > 0 ? (page - 1) * limit + 1 : 0} to ${
        page * limit > total ? total : page * limit
      } of ${total} `

export const formatDate = (date: Date | null) => {
  if (date === null) {
    return 'n/a'
  }

  type OptionsType = {
    year: 'numeric' | '2-digit' | undefined
    month: 'numeric' | '2-digit' | 'short' | undefined
    day: 'numeric' | '2-digit' | undefined
  }

  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  } as OptionsType

  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export const slugify = (str: string) =>
  String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // remove consecutive hyphens
