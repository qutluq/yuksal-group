import { accessPermitted } from '@/utils/api-server'
import {
  getGalleryImage,
  getGalleryImages,
  updateGalleryImage,
} from '@/utils/db'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const paramId = url.searchParams.get('id')

    if (paramId) {
      const id = parseInt(paramId)
      const result = await getGalleryImage(id)
      return new Response(JSON.stringify(result), {
        status: 200,
      })
    } else {
      const paramTag = url.searchParams.get('tag')
      const result = await getGalleryImages(paramTag ?? '')
      return new Response(JSON.stringify(result), {
        status: 200,
      })
    }
  } catch (error) {
    console.error('Unable to fetch gallery image(s)', { error })
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

    updateGalleryImage(galleryImage)
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
