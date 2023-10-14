import { Breadcrumb } from '@/components/breadcrumb'
import { Footer } from '@/components/footer'
import { CoverImageWrapper } from '@/components/image'
import { Nav, NavItems, NavItemsMobile } from '@/components/nav'

import type { TypeMenuPage, UserMode } from '@/types'
type PropTypes = {
  page: TypeMenuPage
  lang: string
  children: React.ReactNode
  bgImg?: string
  mode?: UserMode
}

export const MainLayout = ({
  page,
  lang,
  children,
  bgImg,
  mode = 'user',
}: PropTypes) => {
  //image is on the media server
  return (
    <>
      <CoverImageWrapper bgImg={bgImg}>
        <Nav
          navItems={<NavItems page={page} lang={lang} mode={mode} />}
          navItemsMobile={
            <NavItemsMobile page={page} lang={lang} mode={mode} />
          }
          lang={lang}
        />
        {page !== 'home' && <Breadcrumb page={page} lang={lang} />}
      </CoverImageWrapper>
      {children}
      <Footer lang={lang} />
    </>
  )
}
