import { NAV_MENU } from '@/utils/settings'

import { NavItem } from './nav-item'

type PropTypes = {
  page: string
  lang: string
}

export const NavItems = ({ page, lang }: PropTypes) =>
  NAV_MENU().map((item) => (
    <NavItem key={item.slug} item={item} page={page} lang={lang} />
  ))
