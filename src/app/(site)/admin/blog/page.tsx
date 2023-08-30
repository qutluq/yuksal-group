import type { Metadata } from 'next'

import { BlogAdmin } from '@/components/blog'
import { AdminLayout } from '@/layouts/admin'
import { MainLayout } from '@/layouts/main'
import { getLangSearchParam, toTitleCase, translate } from '@/utils'
import { getMetadata } from '@/utils/db'

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
  const lang = getLangSearchParam(searchParams)

  return (
    <AdminLayout lang={lang}>
      <MainLayout page="blog" lang={lang}>
        <BlogAdmin lang={lang} />
      </MainLayout>
    </AdminLayout>
  )
}

export default Blog
