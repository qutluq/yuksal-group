import Image from 'next/image'

import type { Post as PostType } from '@/types/blog'
import type { User as UserType } from '@/types/user'
import { formatDate } from '@/utils'
import { DEFAULT_AUTHOR_IMG } from '@/utils/settings'

import { PostNeighbours } from './post-neighbours'
import { Sharing } from './sharing'
type PropTypes = {
  author: UserType
  post: PostType
  neighbours: { previousPost: PostType | null; nextPost: PostType | null }
  slug: string
  lang: string
}

export const Post = ({ author, post, neighbours, slug, lang }: PropTypes) => {
  return (
    <div className="flex min-h-[700px] w-full flex-col items-center justify-start gap-7 bg-[var(--color-secondary)]">
      <article className="flex w-5/6 flex-col gap-7 text-[var(--color-text-primary)] md:w-3/4 lg:w-2/3">
        <div className="mx-auto flex w-fit flex-col items-start">
          <div className="flex w-auto flex-row justify-center py-3 text-2xl md:text-3xl">
            {post.title}
          </div>
          <div className="flex w-auto flex-row items-center justify-center gap-3">
            <Image
              src={DEFAULT_AUTHOR_IMG}
              alt=""
              className="rounded-full object-cover"
              width={70}
              height={70}
            />

            <div className="flex flex-col gap-1 tracking-tight text-[var(--color-text-secondary)]">
              <p className="text-[var(--color-text-primary)]">{author.name}</p>
              <div className="flex flex-row gap-1 text-sm">
                <p>{`${post.readingTime} min read`}</p>
                &#183;
                <p>{formatDate(post.publishedAt!)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="whitespace-pre-wrap text-base text-[var(--color-text-primary)]">
          {post.content}
        </div>
      </article>

      <div className="mx-auto flex w-2/3 flex-row gap-5">
        <Sharing slug={slug} lang={lang} />
      </div>

      <Image
        src={'/img/nazim-signature.png'}
        alt=""
        className="object-cover py-10"
        width={200}
        height={70}
      />

      <div className="flex flex-col justify-between gap-3 md:w-[600px] md:flex-row md:gap-0 lg:w-[800px]">
        <PostNeighbours neighbours={neighbours} lang={lang} />
      </div>
    </div>
  )
}
