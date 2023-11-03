import { accessPermitted } from '@/utils/api-server'
import {
  getHomeGalleryImage,
  getHomeGalleryImages,
  updateHomeGalleryImage,
} from '@/utils/db'

export async function GET(request: Request) {
  //fetch all home gallery images or gallery image if id provided in search params

  try {
    const url = new URL(request.url)
    const paramId = url.searchParams.get('id')

    if (paramId) {
      const id = parseInt(paramId)
      const result = await getHomeGalleryImage(id)
      return new Response(JSON.stringify(result), {
        status: 200,
      })
    } else {
      const result = await getHomeGalleryImages()
      return new Response(JSON.stringify(result), {
        status: 200,
      })
    }
  } catch (error) {
    console.error('Unable to fetch home gallery image(s)', { error })
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
    const galleryImage = await request.json()

    updateHomeGalleryImage(galleryImage)
    return new Response(null, {
      status: 204,
    })
  } catch (error) {
    console.error(`Unable to update galleryImage: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}
