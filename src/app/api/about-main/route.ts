import { getAboutMain } from '@/utils/db'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)

    const lang = url.searchParams.get('lang')!

    const result = await getAboutMain(lang)
    return new Response(JSON.stringify(result), {
      status: 200,
    })
  } catch (error) {
    console.error('Unable to fetch about main data', { error })
    return new Response(null, {
      status: 500,
    })
  }
}

// export async function POST(request: Request) {
//   const { permitted, response } = await accessPermitted()
//   if (!permitted) {
//     return response
//   }

//   try {
//     const newsThumbnail = await request.json()

//     updateNewsThumbnail(newsThumbnail)
//     return new Response(null, {
//       status: 204,
//     })
//   } catch (error) {
//     console.error(`Unable to update news thumbnail: ${error}`)
//     return new Response(null, {
//       status: 500,
//     })
//   }
// }
