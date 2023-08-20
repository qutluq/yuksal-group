'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { localeLanguages } from '@/locales'
import { classNames, getDefaultLocale, setSearchParamsLang } from '@/utils'

import nextConfig from '../../../next.config'

export const LanguageSwitcherMobile = () => {
  const router = useRouter()
  const [selectedLang, setSelectedLang] = useState(
    getDefaultLocale({ env: 'client' }),
  )

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const locales = nextConfig.i18n?.locales || ['en']
  const selectLanguage = (code: string) => {
    setSelectedLang(code)
  }

  useEffect(() => {
    document.cookie = `NEXT_LOCALE=${selectedLang}; max-age=${
      2 * (3 * 365 + 366) * 7 * 24 * 60 * 60
    }; path=/`
    const query = setSearchParamsLang(searchParams, selectedLang)
    router.push(`${pathname}${query}`)
  }, [selectedLang])

  return (
    <div className="flex flex-col text-white">
      {locales.map((code) => (
        <div
          key={code}
          onClick={() => selectLanguage(code)}
          className={classNames(
            'px-2 py-3 text-sm font-semibold   uppercase text-gray-50 hover:rounded-md hover:bg-opacity-40',
            selectedLang === code && 'underline underline-offset-4',
          )}
        >
          {localeLanguages[code]}
        </div>
      ))}
    </div>
  )
}
