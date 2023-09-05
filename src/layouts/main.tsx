import { Breadcrumb } from '@/components/breadcrumb'
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

export const MainLayout = ({
  page,
  lang,
  children,
  bgImg,
  mode = 'user',
}: PropTypes) => {
  return (
    <>
      <div
        className={
          'flex h-48 w-full flex-col items-center bg-cover bg-center md:h-[480px] md:bg-[var(--color-secondary)]'
        }
        style={{
          backgroundImage: `url(${
            bgImg || '/assets/blog-bread-cover-img.png'
          })`,
        }}
      >
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
