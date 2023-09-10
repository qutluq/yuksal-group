import { getServerSession } from 'next-auth/next'

import { options as authOptions } from '@/app/api/auth/options'
import type { Post } from '@/types/blog'
export const accessPermitted = async () => {
  const session = await getServerSession(authOptions)

  //early return if user is not logged in
  if (!session) {
    return {
      permitted: false,
      response: new Response('You must be logged in.', {
        status: 401,
      }),
    }
  }

  //early return if user is not admin
  if (session.user.role !== 'admin') {
    return {
      permitted: false,
      response: new Response('Only admin can create a blog post.', {
        status: 403,
      }),
    }
  }

  return { permitted: true, response: null }
}

export const updatePostClientSide = async (id: number, data: Post) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  )

  return response
}

export const createPostClientSide = async (data: Post) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response
}

export const deletePostClientSide = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`,
    {
      method: 'DELETE',
    },
  )

  return response
}

export const getPostsClientSide = async (page: number = 1, limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog?page=${page}&limit=${limit}`,
    {
      method: 'GET',
    },
  )

  return response
}

export const getPostClientSide = async (slug) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${slug}`,
    {
      method: 'GET',
    },
  )

  return response
}

export const getImageClientSide = async (
  filename: string,
  size: 'sm' | 'md' | undefined,
) => {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/images?filename=${filename}${
      size ? '&size=' : ''
    }${size ? size : ''}`,
    {
      method: 'GET',
    },
  )
  return response
}

export const getImageFilenamesClientSide = async () => {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/images/`,
    {
      method: 'GET',
    },
  )
  return response
}
