import type { NextRequest } from 'next/server'

import { accessPermitted } from '@/utils/api-server'
import { deleteNewsThumbnail } from '@/utils/db'

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
    await deleteNewsThumbnail(id)
    return new Response(JSON.stringify({ message: 'News thumbnail deleted' }), {
      status: 200,
    })
  } catch (error) {
    console.error(`Can not delete news thumbnail: ${error}`)
    return new Response(
      JSON.stringify({ message: 'Can not delete news thumbnail' }),
      {
        status: 409,
      },
    )
  }
}
