import { NavItem } from './nav-item'
import { NAV_MENU } from './settings'

type PropTypes = {
  page: string
  lang: string
  mode?: 'user' | 'admin'
}

export const NavItems = ({ page, lang, mode = 'user' }: PropTypes) =>
  NAV_MENU().map((item) => (
    <NavItem key={item.slug} item={item} page={page} lang={lang} mode={mode} />
  ))
