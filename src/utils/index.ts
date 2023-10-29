import type { Metadata } from 'next'

import { localeLanguages } from '@/locales'

import nextConfig from '../../next.config'
import { SiteDescription, SiteName, SiteUrl } from './settings'
import { translations } from './translations'

export const classNames = (...classes: (string | boolean)[]) =>
  classes.filter(Boolean).join(' ')

export const getMetadata = ({
  title,
  description = '',
}: {
  title: string
  description?: string
}) => {
  const desc = description === '' ? SiteDescription : description
  return {
    title: `${title}`,
    description: desc,
    authors: [{ name: 'Qutluq', url: 'https://github.com/qutluq' }],
    colorScheme: 'dark',
    openGraph: {
      title,
      description: desc,
      url: SiteUrl,
      siteName: SiteName,
      type: 'website',
    },
  } as Metadata
}

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

export const translate = (text: string, lang: string) => {
  const translation = translations[slugify(text)]
  return translation ? translation[lang] : `translation not found: ${text}`
}

export const toUppercase = (txt: string) => txt.toUpperCase()

export const toTitleCase = (txt: string) =>
  txt
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

export const getPageSearchParam = (searchParams) =>
  typeof searchParams.page === 'string' ? Number(searchParams.page) : 1

export const getLangSearchParam = (searchParams) =>
  typeof searchParams.lang === 'string'
    ? localeValid(searchParams.lang)
      ? searchParams.lang
      : getServerLocale()
    : getServerLocale()

export const localeValid = (lang) => (localeLanguages[lang] ? true : false)

export const getClientLocale = () =>
  getCookie('NEXT_LOCALE') || nextConfig.i18n?.defaultLocale || 'en'

export const getServerLocale = () => nextConfig.i18n?.defaultLocale || 'en'

export const getCookie = (name) => {
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
  if (!date) {
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

  try {
    const dateString = new Intl.DateTimeFormat('en-US', options).format(date)
    return dateString
  } catch (error) {
    console.error(`Date transform failed: ${date}`)
  }
}

export const formatDateJS = (date: Date | null) => {
  if (!date) {
    return ''
  }

  return [
    date.getFullYear(),
    date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1),
    date.getDate() > 9 ? date.getDate() : '0' + date.getDate(),
  ].join('-')
}

export const getTimeJS = (date: Date | null) => {
  if (!date) {
    return ''
  }

  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
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

export const getFilenameAndExtension = (name: string) => {
  const splitName = name.split('.')
  return [splitName.slice(0, -1).join('.'), splitName.slice(-1)[0]]
}

export const joinURLSegments = (...segments) => {
  // Filter out empty segments and trim leading/trailing slashes
  const cleanedSegments = segments.map((segment) =>
    segment.trim().replace(/^\/|\/$/g, ''),
  )

  // Join the cleaned segments with slashes
  const joinedURL = cleanedSegments.join('/')

  // Add a leading slash if the URL is not empty and does not start with a protocol (e.g., "http://")
  if (joinedURL && !joinedURL.match(/^[a-zA-Z]+:\/\//)) {
    return '/' + joinedURL
  }

  return joinedURL
}

export const findClosestStandardAspectRatio = (
  width: number,
  height: number,
) => {
  const imageRatio = width / height

  const predefinedRatios = [
    [1, 1],
    [2, 3],
    [3, 2],
    [3, 4],
    [4, 3],
    [9, 16],
    [16, 9],
    // [9, 18],
    // [18, 9],
    // [1, 2.39],
    // [2.39, 1],
  ]

  let closestRatio = predefinedRatios[0]
  let minDiff = Math.abs(imageRatio - closestRatio[0] / closestRatio[1])

  for (const ratio of predefinedRatios) {
    const diff = Math.abs(imageRatio - ratio[0] / ratio[1])

    if (diff < minDiff) {
      minDiff = diff
      closestRatio = ratio
    }
  }

  return closestRatio //[width, height]
}
