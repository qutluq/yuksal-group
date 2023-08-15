'use client'
import { useLingui } from '@lingui/react'
import Link from 'next/link'

import type { TYPE_MENU_PAGE } from '@/types/menu-page'
import { MENU_PAGES } from '@/utils/settings'
type PropTypes = {
  page: TYPE_MENU_PAGE
}

export const Breadcrumb = ({ page }: PropTypes) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const i18n = useLingui()

  return (
    <div className="absolute top-24 flex h-24 w-full flex-col items-center justify-between md:top-56 md:h-64">
      <p className="text-3xl uppercase tracking-wide text-white md:text-7xl">
        {MENU_PAGES(page)}
      </p>
      <div className="w-full bg-black/30 py-2 text-white md:py-5">
        <div className="flex flex-row items-center justify-center text-sm font-semibold uppercase  tracking-wide md:text-lg">
          <Link href="home" className="uppercase text-[var(--color-primary)]">
            {MENU_PAGES('home')}
          </Link>
          <p className="align-text-bottom">&nbsp;/&nbsp;</p>
          <p>{MENU_PAGES(page)}</p>
        </div>
      </div>
    </div>
  )
}
