import type { Metadata } from 'next'

import { Blog as BlogComponent } from '@/components/blog'
import { AdminLayout } from '@/layouts/admin'
import { MainLayout } from '@/layouts/main'
import {
  getLangSearchParam,
  getPageSearchParam,
  toTitleCase,
  translate,
} from '@/utils'
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
  const page = getPageSearchParam(searchParams)
  const lang = getLangSearchParam(searchParams)

  return (
    <AdminLayout lang={lang}>
      <MainLayout page="blog" lang={lang}>
        <BlogComponent page={page} limit={limit} lang={lang} mode="admin" />
      </MainLayout>
    </AdminLayout>
  )
}

export default Blog
