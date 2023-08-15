import { localeLanguages, locales } from '@/locales'
import { localeChanged } from '@/redux/features/locale/locale-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { classNames } from '@/utils'

export const LanguageSwitcherMobile = () => {
  const locale = useAppSelector((state) => state.localeManager.locale)
  const dispatch = useAppDispatch()

  const selectLanguage = (code: string) => {
    dispatch(localeChanged(code))
  }

  return (
    <div className="flex flex-col text-white">
      {locales.map((code) => (
        <div
          key={code}
          onClick={() => selectLanguage(code)}
          className={classNames(
            'px-2 py-3 text-sm font-semibold   uppercase text-gray-50 hover:rounded-md hover:bg-opacity-40',
            locale === code && 'underline underline-offset-4',
          )}
        >
          {localeLanguages[code]}
        </div>
      ))}
    </div>
  )
}
