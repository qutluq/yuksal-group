import { writeFile } from 'fs/promises'

import { getFilenameAndExtension, slugify } from '@/utils'
import { accessPermitted } from '@/utils/api-client'

//TODO: remove this file

export async function POST(request: Request) {
  const { permitted, response } = await accessPermitted()
  if (!permitted) {
    return response
  }

  const data = await request.formData()
  const image: File | null = data.get('image') as unknown as File

  if (!image) {
    return new Response(
      JSON.stringify({
        message: 'No file received from the client.',
        imagePath: '',
      }),
      {
        status: 500,
      },
    )
  }

  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const [filename, extension] = getFilenameAndExtension(image.name)
  const imageName = `${slugify(filename)}.${extension}`
  try {
    await writeFile(
      `${process.env.NEXT_PUBLIC_ROOT_DIR}/public/img/${imageName}`,
      buffer,
    )
  } catch (error) {
    console.error(`Image save failed: ${error}`)
    return new Response(
      JSON.stringify({
        message: 'An error occurred while saving the file on the server.',
        imagePath: '',
      }),
      {
        status: 500,
      },
    )
  }

  return new Response(
    JSON.stringify({
      message: 'Image uploaded successfuly.',
      imagePath: `/img/${imageName}`,
    }),
    {
      status: 201,
    },
  )
}
