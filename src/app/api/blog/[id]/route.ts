import type { NextRequest } from 'next/server'

import { accessPermitted } from '@/utils/api-server'
import { deletePost, getAuthor, getPost, updatePost } from '@/utils/db'

export const PUT = async (
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
    const post = await request.json()
    const updated = await updatePost(id, post)

    if (!updated) {
      return new Response(JSON.stringify({ message: 'Post did not update' }), {
        status: 400,
      })
    }
  } catch (error) {
    console.error(`PUT: Internal error: ${error}`)
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    })
  }

  return new Response(JSON.stringify({ message: 'Success' }), {
    status: 200,
  })
}

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
    return new Response(JSON.stringify({ message: 'Post deleted' }), {
      status: 200,
    })
  } catch (error) {
    console.error(`Can not delete: ${error}`)
    return new Response(JSON.stringify({ message: 'Can not delete post' }), {
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
    console.error(`Post not found: ${error}`)
    return new Response(
      JSON.stringify({
        post: null,
        author: null,
        message: 'Post not found',
      }),
      {
        status: 404,
      },
    )
  }
}
