import { Pagination } from '@/components/pagination'
import { getPosts, getSetting } from '@/utils/db'

import { BlogMain } from './blog-main'

type PropTypes = {
  page: number
  lang: string
}

export const Blog = async ({ page, lang }: PropTypes) => {
  const paginationLimit = (await getSetting('paginationLimit')) as number
  const { posts, total: totalPosts } = await getPosts({
    page,
    limit: paginationLimit,
    select: 'published',
  })

  return (
    <>
      <BlogMain posts={posts} lang={lang} />
      <div className="py-5">
        <Pagination
          pathname={'/blog'}
          page={page}
          limit={paginationLimit}
          total={totalPosts}
        />
      </div>
    </>
  )
}
