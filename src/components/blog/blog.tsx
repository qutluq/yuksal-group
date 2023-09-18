import Link from 'next/link'
import { BsClock } from 'react-icons/bs'

import { PosterBlog } from '@/components/image'
import { Pagination } from '@/components/pagination'
import { classNames, formatDate, translate } from '@/utils'
import { getPosts } from '@/utils/db'
import { PAGINATION_LIMIT } from '@/utils/settings'

type PropTypes = {
  page: number
  lang: string
}

export const Blog = async ({ page, lang }: PropTypes) => {
  const { posts, total: totalPosts } = await getPosts({
    page,
    limit: PAGINATION_LIMIT,
    select: 'published',
  })

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        {posts?.map((post) => (
          <div
            key={post.id.toString()}
            className={classNames(
              'flex w-10/12 flex-col gap-3 overflow-hidden rounded-xl  p-2 md:w-[724px] md:flex-row md:gap-0 md:p-3 lg:w-[960px] lg:p-5',
              post.published ? 'bg-white/10' : 'bg-red-800/70',
            )}
          >
            <div className="relative flex h-[220px] flex-row justify-center  overflow-hidden md:mx-2 md:w-[334px] lg:mx-4 lg:h-[300px] lg:w-[448px]">
              <PosterBlog image={post.featuredImage || ''} />
            </div>

            <div className="flex flex-col justify-between gap-3 px-2 md:h-[220px] md:w-[334px] md:gap-0 lg:h-[300px] lg:w-[448px] lg:gap-3 lg:px-4">
              <div className="flex flex-col justify-between gap-1 text-[var(--color-text-primary)] lg:flex-row lg:gap-0">
                <p className="whitespace-pre-wrap break-words pl-3 text-left text-base font-medium lg:w-4/6 lg:text-lg">
                  <Link href={`blog/${post.slug}`}>{post.title}</Link>
                </p>
                <p className="pl-3 text-sm font-medium text-[var(--color-text-secondary)] lg:pl-0 lg:text-base">
                  {formatDate(post.publishedAt)}
                </p>
              </div>
              <p className="overflow-hidden text-ellipsis text-justify text-sm font-medium text-[var(--color-text-primary)] md:h-[120px] lg:h-[200px]">
                {post.description}
              </p>
              <div className="flex flex-row justify-between text-[var(--color-text-primary)]">
                <div className="flex flex-row items-center justify-center gap-2">
                  <BsClock />
                  <p className="pt-1">
                    {post.readingTime} {translate('min', lang)}
                  </p>
                </div>
                <Link href={`blog/${post.slug}`}>
                  {translate('read more', lang)}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="py-5">
        <Pagination
          pathname={'/blog'}
          page={page}
          limit={PAGINATION_LIMIT}
          total={totalPosts}
        />
      </div>
    </>
  )
}
