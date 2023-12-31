import type { Metadata } from 'next'

import { Post as BlogPost } from '@/components/blog'
import { Post } from '@/types/blog'
import {
  getLangSearchParam,
  getMetadata,
  toTitleCase,
  translate,
} from '@/utils'
import { getAuthor, getNeighbourPosts, getPost } from '@/utils/db'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  const lang = getLangSearchParam(searchParams)

  const result = await getPost(params.slug)
  const title =
    result.length === 0
      ? toTitleCase(translate('blog', lang))
      : toTitleCase(translate(result[0].title, lang))
  if (result.length === 0) {
    return getMetadata({ title })
  }

  const post = result[0]

  return getMetadata({ title: post.title })
}

const Post = async ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const result = await getPost(params.slug)

  if (result.length === 0) {
    return (
      <div className="text-xl text-[var(--color-text-primary)]">
        Post does not exist.
      </div>
    )
  }

  const lang = getLangSearchParam(searchParams)

  const post = result[0] as Post
  const neighbours = await getNeighbourPosts(post)

  const author = await getAuthor(post.authorId)

  return (
    <BlogPost
      author={author!}
      post={post}
      neighbours={neighbours}
      slug={params.slug}
      lang={lang}
    />
  )
}

export default Post
