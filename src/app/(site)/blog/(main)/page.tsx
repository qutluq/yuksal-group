import { Blog as BlogComponent } from '@/components/blog'
import { PAGINATION_LIMIT as limit } from '@/utils/settings'

const Blog = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1

  return <BlogComponent page={page} limit={limit}></BlogComponent>
}

export default Blog
