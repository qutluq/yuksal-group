import Image from 'next/image'
import Link from 'next/link'
import { BsClock } from 'react-icons/bs'

import { Pagination } from '@/components/pagination'
import { formatDate } from '@/utils'
import { getPosts } from '@/utils/db'
import {
  DEFAULT_POSTER_POSTS_IMG,
  PAGINATION_LIMIT as limit,
} from '@/utils/settings'

const Blog = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1

  const { posts, total: totalPosts } = await getPosts({ page, limit })

  return (
    <div className="bg-[var(--color-secondary)] py-3">
      <div className="flex flex-col items-center gap-3">
        {posts?.map((post) => (
          <div
            key={post.id.toString()}
            className="flex flex-row overflow-hidden rounded-xl bg-white/10  lg:h-80 lg:w-[960px] lg:p-5"
          >
            <div className="mx-4 overflow-hidden rounded-xl lg:w-[448px]">
              <Image
                src={DEFAULT_POSTER_POSTS_IMG}
                alt=""
                className="object-cover"
                width={450}
                height={300}
              />
            </div>

            <div className="flex flex-col gap-3 px-4 lg:w-[448px]">
              <div className="flex flex-row justify-between text-[var(--color-text-primary)]">
                <p className="w-4/6 whitespace-pre-wrap break-words pl-3 text-left text-lg font-medium">
                  {post.title}
                </p>
                <p className="font-medium">{formatDate(post.publishedAt)}</p>
              </div>
              <p className="h-[200px] overflow-hidden text-ellipsis text-justify text-sm font-medium text-[var(--color-text-primary)]">
                {post.description}
              </p>
              <div className="flex flex-row justify-between text-[var(--color-text-primary)]">
                <div className="flex flex-row items-center justify-center gap-2">
                  <BsClock />
                  <p className="pt-1">{post.readingTime} min</p>
                </div>
                <Link href={`blog/${post.slug}`}>read more</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="py-5">
        <Pagination
          pathname="/blog"
          page={page}
          limit={limit}
          total={totalPosts}
        />
      </div>
    </div>
  )
}

export default Blog
