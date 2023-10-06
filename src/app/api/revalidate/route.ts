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
    return NextResponse.json(
      { message: 'Revalidation success' },
      { status: 200 },
    )
  } catch (error) {
    console.error(`Cache revalidation failed: ${error}`)
    return NextResponse.json({ message: 'Revalidation fail' }, { status: 500 })
  }
}
