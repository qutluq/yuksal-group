import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('secret')
    const tag = request.nextUrl.searchParams.get('tag')

    if (secret !== process.env.NEXT_PUBLIC_MY_SECRET_TOKEN) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    if (!tag) {
      return NextResponse.json(
        { message: 'Missing tag param' },
        { status: 400 },
      )
    }

    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    console.log(`Cache revalidation failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}
