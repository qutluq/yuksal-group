import { Blog as BlogComponent } from '@/components/blog'
import { Breadcrumb } from '@/components/breadcrumb'
import { Footer } from '@/components/footer'
import { Nav, NavItems, NavItemsMobile } from '@/components/nav'
import { getLangSearchParam } from '@/utils'
import { PAGINATION_LIMIT as limit } from '@/utils/settings'

const Blog = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1

  const lang = getLangSearchParam(searchParams)

  return (
    <>
      <div
        className={`h-48 
                    bg-[url('/img/blog-bread-cover-img-640x160.png')] bg-cover 
                    bg-center md:h-[480px] md:bg-[var(--color-secondary)] md:bg-[url('/img/blog-bread-cover-img.png')]`}
      >
        <Nav
          navItems={<NavItems page={'blog'} lang={lang} />}
          navItemsMobile={<NavItemsMobile page={'blog'} lang={lang} />}
        />

        <Breadcrumb page="blog" lang={lang} />
      </div>
      <BlogComponent page={page} limit={limit} lang={lang}></BlogComponent>
      <Footer lang={lang} />
    </>
  )
}

export default Blog
