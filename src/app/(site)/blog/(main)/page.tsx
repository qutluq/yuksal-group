import type { Metadata } from 'next'

import { Blog as BlogComponent } from '@/components/blog'
import { MainLayout } from '@/layouts/main'
import {
  getLangSearchParam,
  getMetadata,
  getPageSearchParam,
  toTitleCase,
  translate,
} from '@/utils'

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
    <MainLayout page="blog" lang={lang}>
      <BlogComponent page={page} lang={lang}></BlogComponent>
    </MainLayout>
  )
}

export default Blog
