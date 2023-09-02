import type { Metadata } from 'next'

import { PostAdmin } from '@/components/blog/post-admin'
import { AdminLayout } from '@/layouts/admin'
import { MainLayout } from '@/layouts/main'
import { getLangSearchParam, toTitleCase } from '@/utils'
import { getMetadata } from '@/utils/db'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const unslug = (slug) => slug.split('-')
  const title = toTitleCase(unslug(params.slug).join(' '))

  return getMetadata({ title })
}

const Post = ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const lang = getLangSearchParam(searchParams)

  return (
    <AdminLayout lang={lang}>
      <MainLayout page="blog" lang={lang}>
        <PostAdmin slug={params.slug} />
      </MainLayout>
    </AdminLayout>
  )
}

export default Post
