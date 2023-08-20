import { Blog as BlogComponent } from '@/components/blog'
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

  return <BlogComponent page={page} limit={limit} lang={lang}></BlogComponent>
}

export default Blog
