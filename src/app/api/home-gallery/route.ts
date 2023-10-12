import { accessPermitted } from '@/utils/api-server'
import { getHomeGalleryImages, updateSlide } from '@/utils/db'

export async function GET() {
  //fetch all home gallery images

  try {
    const result = await getHomeGalleryImages()

    return new Response(JSON.stringify(result), {
      status: 200,
    })
  } catch (error) {
    console.error('Unable to fetch home gallery images', { error })
    return new Response(null, {
      status: 500,
    })
  }
}

export async function POST(request: Request) {
  const { permitted, response } = await accessPermitted()
  if (!permitted) {
    return response
  }

  try {
    const slide = await request.json()

    updateSlide(slide)
    return new Response(null, {
      status: 204,
    })
  } catch (error) {
    console.error('Unable to fetch filenames', { error })
    return new Response(null, {
      status: 500,
    })
  }
}
