import Image from 'next/image'
import Link from 'next/link'
import { TfiFacebook, TfiInstagram, TfiYoutube } from 'react-icons/tfi'

import { formatDate } from '@/utils'
import { getAuthor, getPost } from '@/utils/db'
import { DEFAULT_AUTHOR_IMG } from '@/utils/settings'

const Post = async ({ params }: { params: { slug: string } }) => {
  const result = await getPost(params.slug)

  if (result.length === 0) {
    return <div>Post does not exist</div>
  }

  const post = result[0]

  const author = (await getAuthor(post.authorId)) as unknown as { name: string }

  return (
    <div className="flex min-h-[700px] w-full flex-col items-center justify-start gap-7 bg-[var(--color-secondary)]">
      <article className="flex w-2/3 flex-col gap-7 text-[var(--color-text-primary)]">
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
    </div>
  )
}

export default Post
