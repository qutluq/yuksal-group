import type { Metadata } from 'next'

import { Blog as BlogComponent } from '@/components/blog'
import { MainLayout } from '@/layouts/main'
import {
  getLangSearchParam,
  getPageSearchParam,
  toTitleCase,
  translate,
} from '@/utils'
import { getMetadata } from '@/utils/db'
import { DEFAULT_COVER_POSTS_IMG } from '@/utils/settings'

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
    <MainLayout page="blog" lang={lang} bgImg={DEFAULT_COVER_POSTS_IMG}>
      <BlogComponent page={page} lang={lang}></BlogComponent>
    </MainLayout>
  )
}

export default Blog
