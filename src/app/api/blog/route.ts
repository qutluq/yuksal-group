import { getServerSession } from 'next-auth/next'

import { options as authOptions } from '@/app/api/auth/options'
import { getPosts } from '@/utils/db'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  const url = new URL(request.url)

  const role = !session
    ? 'user'
    : session.user.role === 'admin'
    ? 'admin'
    : 'user'

  const page = parseInt(url.searchParams.get('page')!)
  const limit = parseInt(url.searchParams.get('limit')!)

  const select = role === 'user' ? 'published' : 'all'
  const posts = await getPosts({ select, page, limit })

  return new Response(JSON.stringify(posts), {
    status: 200,
  })
}
