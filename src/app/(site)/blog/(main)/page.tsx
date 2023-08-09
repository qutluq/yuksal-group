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
  const totalPages = Math.ceil(totalPosts / limit)

  return (
    <div className="bg-[var(--color-secondary)] py-3">
      <div className="flex flex-col items-center gap-3">
        {posts?.map((post) => (
          <div
            key={post.id.toString()}
            className="flex flex-row bg-white lg:w-[960px] lg:h-80 lg:p-5 bg-opacity-10 rounded-xl overflow-hidden"
          >
            <div className="lg:w-[448px] mx-4 overflow-hidden rounded-xl">
              <Image
                src={DEFAULT_POSTER_POSTS_IMG}
                alt=""
                className="object-cover"
                width={450}
                height={300}
              />
            </div>

            <div className="flex flex-col lg:w-[448px] px-4 gap-3">
              <div className="flex flex-row text-[var(--color-text-primary)] justify-between">
                <p className="font-medium pl-3 w-4/6 text-lg break-words whitespace-pre-wrap text-left">
                  {post.title}
                </p>
                <p className="font-medium">{formatDate(post.publishedAt)}</p>
              </div>
              <p className="text-sm font-medium text-[var(--color-text-primary)] text-ellipsis text-justify h-[200px] overflow-hidden">
                {post.description}
              </p>
              <div className="flex flex-row justify-between text-[var(--color-text-primary)]">
                <div className="flex flew-row items-center justify-center gap-2">
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
