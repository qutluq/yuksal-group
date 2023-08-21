import { Post as BlogPost } from '@/components/blog'
import { Footer } from '@/components/footer'
import { Nav, NavItems, NavItemsMobile } from '@/components/nav'
import { getLangSearchParam } from '@/utils'
import { getAuthor, getNeighbourPosts, getPost } from '@/utils/db'

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

  const post = result[0]
  const neighbours = await getNeighbourPosts(post)

  const author = await getAuthor(post.authorId)

  return (
    <>
      <div
        className={`h-48 
                    bg-[url('/img/blog-bread-cover-img-640x160.png')] bg-cover 
                    bg-center md:h-[480px] md:bg-[var(--color-secondary)] md:bg-[url('/img/blog-bread-cover-img.png')]`}
      >
        <div className="bg-[#1c284980]">
          <Nav
            navItems={<NavItems page={'blog'} lang={lang} />}
            navItemsMobile={<NavItemsMobile page={'blog'} lang={lang} />}
          />
        </div>
      </div>
      <BlogPost
        author={author!}
        post={post}
        neighbours={neighbours}
        slug={params.slug}
      ></BlogPost>
      <Footer lang={lang} />
    </>
  )
}

export default Post
