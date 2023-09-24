import { NavItem } from './nav-item'
import { NAV_MENU, NAV_MENU_ADMIN } from './settings'

type PropTypes = {
  page: string
  lang: string
  mode?: 'user' | 'admin'
}

export const NavItems = ({ page, lang, mode = 'user' }: PropTypes) => {
  if (mode === 'user') {
    return NAV_MENU().map((item) => (
      <NavItem
        key={item.slug}
        item={item}
        page={page}
        lang={lang}
        mode={mode}
      />
    ))
  }
  return NAV_MENU_ADMIN().map((item) => (
    <NavItem key={item.slug} item={item} page={page} lang={lang} mode={mode} />
  ))
}
