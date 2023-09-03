import type { NextRequest } from 'next/server'

import { accessPermitted } from '@/utils/api'
import { deletePost, getAuthor, getPost } from '@/utils/db'

export const DELETE = async (
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string }
  },
) => {
  const { permitted, response } = await accessPermitted()
  if (!permitted) {
    return response
  }

  const id = Number(params.id)
  try {
    deletePost(id)
    return new Response(`Deleted post with id: ${id}`, {
      status: 200,
    })
  } catch (error) {
    return new Response(`Can not delete: ${error}`, {
      status: 409,
    })
  }
}

export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string }
  },
) => {
  const { permitted, response } = await accessPermitted()
  if (!permitted) {
    return response
  }

  const { id: slug } = params
  try {
    const postRecords = await getPost(slug)

    if (postRecords.length === 0) {
      return new Response(
        JSON.stringify({ post: null, author: null, message: 'Post not found' }),
        {
          status: 404,
        },
      )
    }

    const post = postRecords[0]
    const author = await getAuthor(post.authorId)

    if (!author) {
      return new Response(
        JSON.stringify({
          post: null,
          author: null,
          message: 'Post author not found',
        }),
        {
          status: 404,
        },
      )
    }

    return new Response(
      JSON.stringify({ post: post, author: author, message: 'success' }),
      {
        status: 200,
      },
    )
  } catch (error) {
    return new Response(`Post not found: ${error}`, {
      status: 404,
    })
  }
}