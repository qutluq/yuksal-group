import { translations } from 'prisma/translations'

import { Breadcrumb } from '@/components/breadcrumb'
import { Footer } from '@/components/footer'
import { Nav, NavItems, NavItemsMobile } from '@/components/nav'
import type { AuthorisationText, TypeMenuPage } from '@/types'
import { getAllTranslations, getTranslationFunction } from '@/utils/db'
translations
type PropTypes = {
  page: TypeMenuPage
  lang: string
  children: React.ReactNode
}

export const MainLayout = async ({ page, lang, children }: PropTypes) => {
  const allTanslations = await getAllTranslations()
  const translate = getTranslationFunction(allTanslations, lang)

  const translations: AuthorisationText = {
    signOutButtonTitle: translate('Sign out'),
  }

  return (
    <>
      <div
        className={`h-48 
              bg-[url('/img/blog-bread-cover-img-640x160.png')] bg-cover 
              bg-center md:h-[480px] md:bg-[var(--color-secondary)] md:bg-[url('/img/blog-bread-cover-img.png')]`}
      >
        <Nav
          lang={lang}
          navItems={<NavItems page={page} lang={lang} />}
          navItemsMobile={<NavItemsMobile page={page} lang={lang} />}
          translations={translations}
        />
        {page !== 'home' && <Breadcrumb page={page} lang={lang} />}
      </div>
      {children}
      <Footer lang={lang} />
    </>
  )
}
