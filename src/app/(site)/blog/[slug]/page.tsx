import { Post as BlogPost } from '@/components/blog'
import { getAuthor, getNeighbourPosts, getPost } from '@/utils/db'

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

  const author = await getAuthor(post.authorId)

  return (
    <BlogPost
      author={author!}
      post={post}
      neighbours={neighbours}
      slug={params.slug}
    ></BlogPost>
  )
}

export default Post
