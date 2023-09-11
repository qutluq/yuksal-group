import type { Post } from '@/types/blog'

export const updatePostClientSide = async (id: number, data: Post) => {
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
}

export const createPostClientSide = async (data: Post) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response
}

export const deletePostClientSide = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`,
    {
      method: 'DELETE',
    },
  )

  return response
}

export const getPostsClientSide = async (page: number = 1, limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog?page=${page}&limit=${limit}`,
    {
      method: 'GET',
    },
  )

  return response
}

export const getPostClientSide = async (slug) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${slug}`,
    {
      method: 'GET',
    },
  )

  return response
}

export const getImageClientSide = async (
  filename: string,
  size: 'sm' | 'md' | undefined,
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

export const uploadImageClientSide = async (file) => {
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
