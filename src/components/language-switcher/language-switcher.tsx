import { useState } from 'react'

import { localeLanguages, locales } from '@/locales'
import { localeChanged } from '@/redux/features/locale/locale-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export const LanguageSwitcher = () => {
  const [expanded, setExpanded] = useState(false)

  const locale = useAppSelector((state) => state.localeManager.locale)
  const dispatch = useAppDispatch()

  const selectLanguage = (code: string) => {
    setExpanded(false)
    dispatch(localeChanged(code))
  }

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
      {localeLanguages[locale]?.slice(0, 3)}
    </div>
  )
}
