import { accessPermitted } from '@/utils/api-server'
import { getPosts } from '@/utils/db'

export async function GET(request: Request) {
  const { permitted, response } = await accessPermitted()
  if (!permitted) {
    return response
  }

  const url = new URL(request.url)

  const page = parseInt(url.searchParams.get('page')!)
  const limit = parseInt(url.searchParams.get('limit')!)

  const posts = await getPosts({ select: 'all', page, limit })

  return new Response(JSON.stringify(posts), {
    status: 200,
  })
}
