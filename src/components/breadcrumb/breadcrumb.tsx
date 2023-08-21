import Link from 'next/link'

import type { TYPE_MENU_PAGE } from '@/types/menu-page'
import { getAllTranslations, getTranslationFunction } from '@/utils/db'
type PropTypes = {
  page: TYPE_MENU_PAGE
  lang: string
}

export const Breadcrumb = async ({ page, lang }: PropTypes) => {
  const translations = await getAllTranslations()
  const translate = getTranslationFunction(translations, lang)

  return (
    <div className="absolute top-24 flex h-24 w-full flex-col items-center justify-between md:top-56 md:h-64">
      <p className="text-3xl uppercase tracking-wide text-white md:text-7xl">
        {translate(page)}
      </p>
      <div className="w-full bg-black/30 py-2 text-white md:py-5">
        <div className="flex flex-row items-center justify-center text-sm font-semibold uppercase  tracking-wide md:text-lg">
          <Link href="home" className="uppercase text-[var(--color-primary)]">
            {translate('home')}
          </Link>
          <p className="align-text-bottom">&nbsp;/&nbsp;</p>
          <p>{translate(page)}</p>
        </div>
      </div>
    </div>
  )
}
