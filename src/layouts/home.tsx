import { Footer } from '@/components/footer'
import { Nav, NavItems, NavItemsMobile } from '@/components/nav'

import type { UserMode } from '@/types'

type PropTypes = {
  lang: string
  children: React.ReactNode
  mode?: UserMode
}

export const HomeLayout = ({ lang, children, mode = 'user' }: PropTypes) => {
  //image is on the media server
  return (
    <>
      <Nav
        navItems={<NavItems page="home" lang={lang} mode={mode} />}
        navItemsMobile={<NavItemsMobile page="home" lang={lang} mode={mode} />}
        lang={lang}
      />
      {children}
      <Footer lang={lang} />
    </>
  )
}
