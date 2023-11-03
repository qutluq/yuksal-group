import type { NextRequest } from 'next/server'

import { accessPermitted } from '@/utils/api-server'
import { deleteGalleryImage } from '@/utils/db'

export const DELETE = async (
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string }
  },
) => {
  const { permitted, response } = await accessPermitted()
  if (!permitted) {
    return response
  }

  const id = Number(params.id)
  try {
    await deleteGalleryImage(id)
    return new Response(JSON.stringify({ message: 'Gallery image deleted' }), {
      status: 200,
    })
  } catch (error) {
    console.error(`Can not delete gallery image: ${error}`)
    return new Response(
      JSON.stringify({ message: 'Can not delete gallery image' }),
      {
        status: 409,
      },
    )
  }
}
