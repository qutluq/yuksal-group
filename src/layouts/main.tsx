import { Breadcrumb } from '@/components/breadcrumb'
import { Footer } from '@/components/footer'
import { Nav, NavItems, NavItemsMobile } from '@/components/nav'
import type { TypeMenuPage } from '@/types'
type PropTypes = {
  page: TypeMenuPage
  lang: string
  children: React.ReactNode
}

export const MainLayout = ({ page, lang, children }: PropTypes) => {
  return (
    <>
      <div
        className={`h-48 
              bg-[url('/img/blog-bread-cover-img-640x160.png')] bg-cover 
              bg-center md:h-[480px] md:bg-[var(--color-secondary)] md:bg-[url('/img/blog-bread-cover-img.png')]`}
      >
        <Nav
          navItems={<NavItems page={page} lang={lang} />}
          navItemsMobile={<NavItemsMobile page={page} lang={lang} />}
        />
        {page !== 'home' && <Breadcrumb page={page} lang={lang} />}
      </div>
      {children}
      <Footer lang={lang} />
    </>
  )
}
