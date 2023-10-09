import { accessPermitted } from '@/utils/api-server'
import { getSlide, getSlides, updateSlide } from '@/utils/db'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const paramId = url.searchParams.get('id')

  if (paramId) {
    //if paramId present fetch slide with id = paramId
    try {
      const id = parseInt(paramId)
      const result = await getSlide(id)
      return new Response(JSON.stringify(result), {
        status: 200,
      })
    } catch (error) {
      console.error(`Unable to fetch slide: ${error}`)
      return new Response(null, {
        status: 500,
      })
    }
  } else {
    //fetch all slides
    const result = await getSlides()

    return new Response(JSON.stringify(result), {
      status: 200,
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
