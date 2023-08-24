import type { Metadata } from 'next'

import { Blog as BlogComponent } from '@/components/blog'
import { MainLayout } from '@/layouts/main'
import { getLangSearchParam, toTitleCase, translate } from '@/utils'
import { getMetadata } from '@/utils/db'
import { PAGINATION_LIMIT as limit } from '@/utils/settings'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  const lang = getLangSearchParam(searchParams)
  const title = toTitleCase(translate('blog', lang))

  return getMetadata({ title })
}

const Blog = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1

  const lang = getLangSearchParam(searchParams)

  return (
    <MainLayout page="blog" lang={lang}>
      <BlogComponent page={page} limit={limit} lang={lang}></BlogComponent>
    </MainLayout>
  )
}

export default Blog
