import { useEffect, useState } from 'react'

import type { Post } from '@/types/blog'
import { getPostsClientSide } from '@/utils/api-client'
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
          if (response.ok || (response.status > 199 && response.status < 300)) {
            return response.json()
          }
          throw new Error(`getPosts failed, response status=${response.status}`)
        }
      })
      .then((data) => {
        const { posts: blogposts, total } = data
        setPosts(blogposts)
        setTotalPosts(total)
      })
      .catch((error) => {
        console.error(error)
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
