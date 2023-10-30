import { getServerSession } from 'next-auth/next'

import { options as authOptions } from '@/app/api/auth/options'
import { joinURLSegments } from '@/utils'

export const accessPermitted = async () => {
  const session = await getServerSession(authOptions)

  //early return if user is not logged in
  if (!session) {
    console.error('Authorisation required')
    return {
      permitted: false,
      response: new Response(null, {
        status: 401,
      }),
    }
  }

  //early return if user is not admin
  if (session.user.role !== 'admin') {
    console.error('Admin role required')
    return {
      permitted: false,
      response: new Response(null, {
        status: 403,
      }),
    }
  }

  return {
    permitted: true,
    response: new Response(null, {
      status: 200,
    }),
  }
}

export const createMediaFile = async (dir, filename, formData) => {
  try {
    const url = `${joinURLSegments(
      process.env.NEXT_PUBLIC_MEDIA_SERVER_URL,
      dir,
      filename,
    )}`

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })
    return response
  } catch (error) {
    console.error('Unable to fetch image', { error })
    return new Response(null, {
      status: 500,
    })
  }
}

export const deleteMediaFile = async (filePath) => {
  try {
    const url = `${joinURLSegments(
      process.env.NEXT_PUBLIC_MEDIA_SERVER_URL,
      filePath,
    )}`

    const response = await fetch(url, {
      method: 'DELETE',
    })
    return response
  } catch (error) {
    console.error('Unable to delete image', { error })
    return new Response(null, {
      status: 500,
    })
  }
}

export const getMediaFile = async (dir, filename, size) => {
  try {
    const url = `${joinURLSegments(
      process.env.NEXT_PUBLIC_MEDIA_SERVER_URL,
      dir,
      filename,
    )}${size ? '?size=' : ''}${size ? size : ''}`

    const response = await fetch(url, {
      next: { tags: ['images-cache'] },
      cache: 'force-cache',
    })
    return response
  } catch (error) {
    console.error('Unable to fetch image', { error })
    return new Response(null, {
      status: 500,
    })
  }
}

export const getAllMediaFilenames = async (dir) => {
  try {
    const url = joinURLSegments(process.env.NEXT_PUBLIC_MEDIA_SERVER_URL, dir)

    const response = await fetch(url)
    return response
  } catch (error) {
    console.error('Unable to fetch list of filenames', { error })
    return new Response(null, {
      status: 500,
    })
  }
}
