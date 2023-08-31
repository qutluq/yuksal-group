import { useEffect, useState } from 'react'

import type { Post } from '@/types/blog'
import { getPostsClientSide } from '@/utils/api'
import { PAGINATION_LIMIT } from '@/utils/settings'
export const usePaginatedPostsClientSide = () => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [update, setUpdate] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [totalPosts, setTotalPosts] = useState<number>(0)

  const updatePosts = () => {
    setLoading(true)
    getPostsClientSide(page, PAGINATION_LIMIT)
      .then((response) => {
        {
          return response.json()
        }
      })
      .then((data) => {
        const { posts: blogposts, total } = data
        setPosts(blogposts)
        setTotalPosts(total)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!update) {
      return
    }
    setUpdate(false)
    updatePosts()
  }, [update])

  useEffect(() => {
    if (page < 1) {
      return
    }
    const totalPages = Math.ceil(totalPosts / PAGINATION_LIMIT)
    if (page > totalPages && totalPosts > 0) {
      setPage(totalPages)
      return
    }

    updatePosts()
  }, [page])

  return { loading, page, setPage, posts, totalPosts, setUpdate }
}
