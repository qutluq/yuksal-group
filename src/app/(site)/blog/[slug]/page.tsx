import Image from 'next/image'
import Link from 'next/link'
import { TfiFacebook, TfiInstagram, TfiYoutube } from 'react-icons/tfi'

import { Button } from '@/components/button'
import { classNames, formatDate } from '@/utils'
import { getAuthor, getNeighbourPosts, getPost } from '@/utils/db'
import { DEFAULT_AUTHOR_IMG } from '@/utils/settings'

const Post = async ({ params }: { params: { slug: string } }) => {
  const result = await getPost(params.slug)

  if (result.length === 0) {
    return (
      <div className="text-xl text-[var(--color-text-primary)]">
        Post does not exist.
      </div>
    )
  }

  const post = result[0]
  const neighbours = await getNeighbourPosts(post)

  const author = (await getAuthor(post.authorId)) as unknown as { name: string }

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
                <p>{formatDate(post.publishedAt)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="whitespace-pre-wrap text-base text-[var(--color-text-primary)]">
          {post.content}
        </div>
      </article>

      <div className="mx-auto flex w-2/3 flex-row gap-5">
        <p className="pt-1 text-xl text-[var(--color-text-secondary)]">
          Share:
        </p>
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=https://www.yuksal-group.com/blog/${params.slug}/`}
          target="_blank"
        >
          <TfiYoutube className="text-3xl text-white" />
        </Link>
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=https://www.yuksal-group.com/blog/${params.slug}/`}
          target="_blank"
        >
          <TfiFacebook className="text-3xl text-white" />
        </Link>
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=https://www.yuksal-group.com/blog/${params.slug}/`}
          target="_blank"
        >
          <TfiInstagram className="text-3xl text-white" />
        </Link>
      </div>

      <Image
        src={'/img/nazim-signature.png'}
        alt=""
        className="object-cover py-10"
        width={200}
        height={70}
      />

      <div className="flex flex-col justify-between gap-3 md:w-[600px] md:flex-row md:gap-0 lg:w-[800px]">
        <div
          className={classNames(
            'border-y',
            neighbours.previousPost === null
              ? 'border-y-gray-500'
              : 'border-y-white',
          )}
        >
          <Button
            href={neighbours.previousPost?.slug || '#'}
            disabled={neighbours.previousPost === null}
            variant="text"
          >
            <p className="flex w-full flex-row justify-center overflow-hidden truncate md:w-60">
              {neighbours.previousPost?.title || 'Previous'}
            </p>
          </Button>
        </div>
        <div
          className={classNames(
            'border-y',
            neighbours.nextPost === null
              ? 'border-y-gray-500'
              : 'border-y-white',
          )}
        >
          <Button
            href={neighbours.nextPost?.slug || '#'}
            disabled={neighbours.nextPost === null}
            variant="text"
          >
            <p className="flex w-full flex-row justify-center overflow-hidden truncate md:w-60">
              {neighbours.nextPost?.title || 'Next'}
            </p>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Post
