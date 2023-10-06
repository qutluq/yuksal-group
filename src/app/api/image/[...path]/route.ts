import {
  accessPermitted,
  createMediaFile,
  deleteMediaFile,
  getAllMediaFilenames,
  getMediaFile,
} from '@/utils/api-server'

type PropTypes = {
  params: { path: string[] }
}
export async function GET(request: Request, { params }: PropTypes) {
  /**
   * Endpoint for delivering file or filenames.
   * Route segment: `path` is a directory in which media files are located on media server.
   * @param filename - searchParams item, name of the file on media server to be fetched
   *
   * If filename param is specified, only the file with this name located in `path` dir  will be fetched
   * If no param is specified, list of all media filenames within `path` dir are fetched.
   */
  const url = new URL(request.url)
  const filename = url.searchParams.get('filename')

  if (filename !== null) {
    if (filename === '') {
      console.error(`Bad request: empty filename`)
      return new Response(null, { status: 400 })
    }
    //fetch a single image with name=filename
    const size = url.searchParams.get('size')
    try {
      const dir = params.path.join('/')

      const response = await getMediaFile(dir, filename, size)
      const image_blob = await response.blob()

      return new Response(image_blob, { status: 200 })
    } catch (error) {
      console.error('Unable to fetch image', { error })
      return new Response(null, {
        status: 500,
      })
    }
  } else {
    if (url.searchParams.size === 0) {
      //fetch list of all media filenames within `path` dir on media server

      try {
        const dir = params.path.join('/')

        const response = await getAllMediaFilenames(dir)
        const data = await response.json()
        const { filenames } = JSON.parse(data)

        return new Response(JSON.stringify({ filenames: filenames }), {
          status: 200,
        })
      } catch (error) {
        console.error('Unable to fetch filenames', { error })
        return new Response(null, {
          status: 500,
        })
      }
    } else {
      console.error(`Unknown set of query parameters`)
      return new Response(null, {
        status: 500,
      })
    }
  }
}

export async function POST(request: Request, { params }: PropTypes) {
  const { permitted, response } = await accessPermitted()
  if (!permitted) {
    return response
  }

  const formData = await request.formData()
  const image: File | null = formData.get('file') as unknown as File

  if (!image) {
    return new Response(
      JSON.stringify({
        message: 'No image received from the client.',
      }),
      {
        status: 500,
      },
    )
  }

  //TODO: if image is being used in blog table, return error response
  const dir = params.path.join('/')
  return createMediaFile(dir, image.name, formData)
}

export async function DELETE(request: Request, { params }: PropTypes) {
  const { permitted, response } = await accessPermitted()
  if (!permitted) {
    return response
  }

  //TODO: check if image is used in blog table
  //if used return error response

  const filePath = params.path.join('/')
  return deleteMediaFile(filePath)
}
