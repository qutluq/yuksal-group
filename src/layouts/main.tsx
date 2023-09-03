import { Breadcrumb } from '@/components/breadcrumb'
import { Footer } from '@/components/footer'
import { Nav, NavItems, NavItemsMobile } from '@/components/nav'
import type { TypeMenuPage } from '@/types'
type PropTypes = {
  page: TypeMenuPage
  lang: string
  children: React.ReactNode
  bgImg?: string
}

export const MainLayout = ({ page, lang, children, bgImg }: PropTypes) => {
  return (
    <>
      <div
        className={
          'flex h-48 w-full flex-col items-center bg-cover bg-center md:h-[480px] md:bg-[var(--color-secondary)]'
        }
        style={{
          backgroundImage: `url(${bgImg || '/img/blog-bread-cover-img.png'})`,
        }}
      >
        <Nav
          navItems={<NavItems page={page} lang={lang} />}
          navItemsMobile={<NavItemsMobile page={page} lang={lang} />}
          lang={lang}
        />
        {page !== 'home' && <Breadcrumb page={page} lang={lang} />}
      </div>
      {children}
      <Footer lang={lang} />
    </>
  )
}
