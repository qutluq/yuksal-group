'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { localeLanguages } from '@/locales'
import { setSearchParamsLang } from '@/utils'

import nextConfig from '../../../next.config'

export const LanguageSwitcher = ({ lang }: { lang: string }) => {
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()
  const [selectedLang, setSelectedLang] = useState(lang)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const locales = nextConfig.i18n?.locales || ['en']

  const selectLanguage = (code: string) => {
    setSelectedLang(code)
    setExpanded(false)
  }

  useEffect(() => {
    document.cookie = `NEXT_LOCALE=${selectedLang}; max-age=${
      2 * (3 * 365 + 366) * 7 * 24 * 60 * 60
    }; path=/`
    const query = setSearchParamsLang(searchParams, selectedLang)
    router.push(`${pathname}${query}`)
  }, [selectedLang])

  if (expanded) {
    return (
      <div className="flex flex-col lowercase text-white">
        {locales.map((code) => (
          <div key={code} onClick={() => selectLanguage(code)}>
            {localeLanguages[code]?.slice(0, 3)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div onClick={() => setExpanded(true)} className="lowercase text-white">
      {localeLanguages[selectedLang]?.slice(0, 3)}
    </div>
  )
}
