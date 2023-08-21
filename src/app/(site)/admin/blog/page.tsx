import { Blog as BlogComponent } from '@/components/blog'
import { MainLayout } from '@/layouts/main'
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
    <MainLayout page="blog" lang={lang}>
      <BlogComponent page={page} limit={limit} lang={lang} mode="admin" />
    </MainLayout>
  )
}

export default Blog
