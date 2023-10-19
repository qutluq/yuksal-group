import { accessPermitted } from '@/utils/api-server'
import {
  getNewsThumbnail,
  getNewsThumbnails,
  updateNewsThumbnail,
} from '@/utils/db'

export async function GET(request: Request) {
  //fetch all home gallery images or gallery image if id provided in search params

  try {
    const url = new URL(request.url)
    const paramId = url.searchParams.get('id')

    if (paramId) {
      const id = parseInt(paramId)
      const result = await getNewsThumbnail(id)
      return new Response(JSON.stringify(result), {
        status: 200,
      })
    } else {
      const result = await getNewsThumbnails()
      return new Response(JSON.stringify(result), {
        status: 200,
      })
    }
  } catch (error) {
    console.error('Unable to fetch news thumbnail(s)', { error })
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
    const newsThumbnail = await request.json()

    updateNewsThumbnail(newsThumbnail)
    return new Response(null, {
      status: 204,
    })
  } catch (error) {
    console.error(`Unable to update news thumbnail: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}
