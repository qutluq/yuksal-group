import { getServerSession } from 'next-auth/next'

import { options as authOptions } from '@/app/api/auth/options'

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
