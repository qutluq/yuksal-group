import Image from 'next/image'

import { Breadcrumb } from '@/components/breadcrumb'
import { Footer } from '@/components/footer'
import { CoverImageWrapper } from '@/components/image'
import { Nav, NavItems, NavItemsMobile } from '@/components/nav'
import type { TypeMenuPage } from '@/types'
import { DEFAULT_COVER_POSTS_IMG } from '@/utils/settings'
type PropTypes = {
  page: TypeMenuPage
  lang: string
  children: React.ReactNode
  bgImg: string
  mode?: 'user' | 'admin'
}

export const MainLayout = ({
  page,
  lang,
  children,
  bgImg,
  mode = 'user',
}: PropTypes) => {
  if (bgImg.startsWith('/assets') || !bgImg) {
    //image is bundled with nextjs app or not set
    return (
      <>
        <div
          className={
            'relative flex h-48 w-full flex-col items-center bg-cover bg-center md:h-[480px] md:bg-[var(--color-secondary)]'
          }
        >
          <div className="absolute h-48 w-full overflow-hidden md:h-[480px]">
            <Image
              src={bgImg || DEFAULT_COVER_POSTS_IMG}
              alt=""
              className="object-cover"
              fill
            />
          </div>
          <Nav
            navItems={<NavItems page={page} lang={lang} mode={mode} />}
            navItemsMobile={
              <NavItemsMobile page={page} lang={lang} mode={mode} />
            }
            lang={lang}
          />
          {page !== 'home' && <Breadcrumb page={page} lang={lang} />}
        </div>
        {children}
        <Footer lang={lang} />
      </>
    )
  }

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
