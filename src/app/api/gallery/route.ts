import { getGalleryImages } from '@/utils/db'

export async function GET() {
  try {
    const result = await getGalleryImages()
    return new Response(JSON.stringify(result), {
      status: 200,
    })
  } catch (error) {
    console.error('Unable to fetch gallery images', { error })
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
//     const aboutMain = await request.json()

//     updateAboutMain(aboutMain)
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
