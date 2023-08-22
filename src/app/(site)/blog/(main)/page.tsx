import type { Metadata } from 'next'

import { Blog as BlogComponent } from '@/components/blog'
import { MainLayout } from '@/layouts/main'
import { getLangSearchParam, toTitleCase } from '@/utils'
import {
  getAllTranslations,
  getMetadata,
  getTranslationFunction,
} from '@/utils/db'
import { PAGINATION_LIMIT as limit } from '@/utils/settings'

export async function generateMetadata({
  searchParams,
}: {
  [key: string]: string | string[] | undefined
}): Promise<Metadata> {
  const lang = getLangSearchParam(searchParams)
  const translations = await getAllTranslations()
  const translate = getTranslationFunction(translations, lang)
  const title = toTitleCase(translate('blog'))

  return getMetadata({ title })
}

const Blog = async ({
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
