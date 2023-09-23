import type { Metadata } from 'next'
import { RouteChangesProvider } from 'nextjs-router-events'

import { PostAdmin } from '@/components/blog/post-admin'
import { AdminLayout } from '@/layouts/admin'
import { getLangSearchParam, getMetadata, toTitleCase } from '@/utils'

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
  const { slug } = params

  return (
    <AdminLayout lang={lang}>
      <RouteChangesProvider>
        <PostAdmin slug={slug} lang={lang} />
      </RouteChangesProvider>
    </AdminLayout>
  )
}

export default Post
