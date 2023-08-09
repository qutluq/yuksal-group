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
    <div className="flex flex-col items-center justify-start gap-7 w-full bg-[var(--color-secondary)] min-h-[700px]">
      <article className="w-2/3 text-[var(--color-text-primary)] flex flex-col gap-7">
        <div className="mx-auto w-fit flex flex-col items-start">
          <div className="flex flex-row justify-center text-2xl md:text-3xl py-3 w-auto">
            {post.title}
          </div>
          <div className="flex flex-row items-center justify-center gap-3 w-auto">
            <Image
              src={DEFAULT_AUTHOR_IMG}
              alt=""
              className="object-cover rounded-full"
              width={70}
              height={70}
            />

            <div className="flex flex-col text-[var(--color-text-secondary)] gap-1 tracking-tight">
              <p className="text-[var(--color-text-primary)]">{author.name}</p>
              <div className="flex flex-row gap-1 text-sm">
                <p>{`${post.readingTime} min read`}</p>
                &#183;
                <p>{formatDate(post.publishedAt)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[var(--color-text-primary)] text-base whitespace-pre-wrap">
          {post.content}
        </div>
      </article>

      <div className="flex flex-row gap-5 w-2/3 mx-auto">
        <p className="text-[var(--color-text-secondary)] text-xl pt-1">
          Share:
        </p>
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=https://www.yuksal-group.com/blog/${params.slug}/`}
          target="_blank"
        >
          <TfiYoutube className="text-white text-3xl" />
        </Link>
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=https://www.yuksal-group.com/blog/${params.slug}/`}
          target="_blank"
        >
          <TfiFacebook className="text-white text-3xl" />
        </Link>
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=https://www.yuksal-group.com/blog/${params.slug}/`}
          target="_blank"
        >
          <TfiInstagram className="text-white text-3xl" />
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
