import type { Settings } from '@/types'
import type { Post } from '@/types/blog'

export const updatePostClientSide = async (id: number, data: Post) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
    return response
  } catch (error) {
    console.error(`Post Update failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}

export const createPostClientSide = async (data: Post) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )

    return response
  } catch (error) {
    console.error(`Post Create failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}

export const deletePostClientSide = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`,
      {
        method: 'DELETE',
      },
    )

    return response
  } catch (error) {
    console.error(`Post Delete failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}

export const getPostsClientSide = async (page: number = 1, limit: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog?page=${page}&limit=${limit}`,
      {
        method: 'GET',
      },
    )

    return response
  } catch (error) {
    console.error(`Posts Get failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}

export const getPostClientSide = async (slug) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${slug}`,
      {
        method: 'GET',
      },
    )

    return response
  } catch (error) {
    console.error(`Post Get failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}

export const getImageClientSide = async (
  filename: string,
  size: 'sm' | 'md' | undefined = undefined,
) => {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/images?filename=${filename}${
      size ? '&size=' : ''
    }${size ? size : ''}`,
    {
      method: 'GET',
    },
  )
  return response
}

export const getImageFilenamesClientSide = async () => {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/images/`,
    {
      method: 'GET',
    },
  )
  return response
}

export const uploadImageClientSide = (file) => {
  const formData = new FormData()

  formData.append('file', file, file.name) // 'file' is the field name, and 'filename.txt' is the desired file name

  const response = fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/images`,
    {
      method: 'POST',
      body: formData,
    },
  )

  return response
}

export const deleteImageClientSide = (filename) => {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/images/${filename}`,
    {
      method: 'DELETE',
    },
  )

  return response
}

export const revalidateImageCache = () => {
  fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?tag=images-cache&secret=${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`,
    {
      method: 'POST',
    },
  )
    .then((response) => {
      if (!response.ok) {
        return response.json()
      }
    })
    .then((json) => {
      console.error(`Image cache validation failed ${json.message}`)
    })
    .catch((error) => {
      console.error(`Error occured ${error}`)
    })
}

export const getSettingsClientSide = async () => {
  const response = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/`, {
    method: 'GET',
  })
  return response
}

export const updateSettingsClientSide = async (settings: Settings) => {
  try {
    const response = fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      },
    )

    return response
  } catch (error) {
    console.error(`Settings update failed: ${error}`)
    return new Response(null, {
      status: 500,
    })
  }
}
