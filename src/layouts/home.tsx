import { Footer } from '@/components/footer'
import { Nav, NavItems, NavItemsMobile } from '@/components/nav'

import type { TypeMenuPage } from '@/types'
type PropTypes = {
  page: TypeMenuPage
  lang: string
  children: React.ReactNode
  bgImg?: string
  mode?: 'user' | 'admin'
}

export const HomeLayout = ({
  page,
  lang,
  children,
  mode = 'user',
}: PropTypes) => {
  //image is on the media server
  return (
    <>
      <Nav
        navItems={<NavItems page={page} lang={lang} mode={mode} />}
        navItemsMobile={<NavItemsMobile page={page} lang={lang} mode={mode} />}
        lang={lang}
      />
      {children}
      <Footer lang={lang} />
    </>
  )
}
