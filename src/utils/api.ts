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
