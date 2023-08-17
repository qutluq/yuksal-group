import Link from 'next/link'

import { Translate } from '@/components/translate'
import type { TYPE_MENU_PAGE } from '@/types/menu-page'
type PropTypes = {
  page: TYPE_MENU_PAGE
}

export const Breadcrumb = ({ page }: PropTypes) => {
  return (
    <div className="absolute top-24 flex h-24 w-full flex-col items-center justify-between md:top-56 md:h-64">
      <p className="text-3xl uppercase tracking-wide text-white md:text-7xl">
        <Translate text={page} />
      </p>
      <div className="w-full bg-black/30 py-2 text-white md:py-5">
        <div className="flex flex-row items-center justify-center text-sm font-semibold uppercase  tracking-wide md:text-lg">
          <Link href="home" className="uppercase text-[var(--color-primary)]">
            <Translate text={'home'} />
          </Link>
          <p className="align-text-bottom">&nbsp;/&nbsp;</p>
          <p>
            <Translate text={page} />
          </p>
        </div>
      </div>
    </div>
  )
}
