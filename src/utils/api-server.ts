import { joinURLSegments } from '@/utils'

export const getMediaFile = async (dir, filename, size) => {
  try {
    const url = `${joinURLSegments(
      process.env.NEXT_PUBLIC_MEDIA_SERVER_URL,
      dir,
      filename,
    )}${size ? '?size=' : ''}${size ? size : ''}`

    console.log({ size, url })

    const response = await fetch(url)
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
