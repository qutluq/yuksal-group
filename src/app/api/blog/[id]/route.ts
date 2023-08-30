import type { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'

import { options as authOptions } from '@/app/api/auth/options'
import { deletePost } from '@/utils/db'

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string }
  },
) {
  const session = await getServerSession(authOptions)

  //early return if user is not logged in
  if (!session) {
    return new Response('You must be logged in.', {
      status: 401,
    })
  }

  //early return if user is not admin
  if (session.user.role !== 'admin') {
    return new Response('Only admin can create a blog post.', {
      status: 403,
    })
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
