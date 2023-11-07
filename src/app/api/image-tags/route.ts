import { getImageTags } from '@/utils/db'

export async function GET() {
  try {
    const result = await getImageTags()
    return new Response(JSON.stringify(result), {
      status: 200,
    })
  } catch (error) {
    console.error('Unable to fetch gallery image(s)', { error })
    return new Response(null, {
      status: 500,
    })
  }
}
