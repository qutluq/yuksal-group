import { useEffect, useState } from 'react'

import type { Post } from '@/types/blog'
import { getImageUrlsClientSide, getPostsClientSide } from '@/utils/api-client'

import { useContextSettings } from './useContextSettings'
type ImageUrls = {
  [key: string]: string
}
export const usePaginatedPostsClientSide = () => {
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [update, setUpdate] = useState(false)
  const [paginationLimit, setPaginationLimit] = useState<number>()
  const { settings, initialized: limitReady } = useContextSettings()
  const [posts, setPosts] = useState<Post[]>([])
  const [totalPosts, setTotalPosts] = useState<number>(0)
  const [imageUrls, setImageUrls] = useState<ImageUrls>({})

  useEffect(() => {
    setPaginationLimit(settings.paginationLimit)
  }, [limitReady])

  const updatePosts = () => {
    if (!limitReady) return
    setLoading(true)
    getPostsClientSide(page, paginationLimit!)
      .then((response) => {
        if (response.ok || (response.status > 199 && response.status < 300)) {
          return response.json()
        }
        console.error(`getPosts failed, response status=${response.status}`)
      })
      .then((data) => {
        const { posts: blogposts, total } = data
        setPosts(blogposts)
        const featuredImages = blogposts
          .map((post) => post.featuredImage)
          .filter((image) => image !== null)
        setTotalPosts(total)

        getImageUrlsClientSide(featuredImages).then((imageUrlsObject) => {
          setImageUrls((state) => ({ ...state, ...imageUrlsObject }))
          setLoading(false)
        })
      })
      .catch((error) => {
        console.error(`Posts fetch failed: ${error}`)
      })
  }

  useEffect(() => {
    if (!limitReady) {
      return
    }
    if (!update) {
      return
    }
    setUpdate(false)
    updatePosts()
  }, [update, limitReady])

  useEffect(() => {
    if (page < 1 || !paginationLimit) {
      return
    }
    const totalPages = Math.ceil(totalPosts / paginationLimit)
    if (page > totalPages && totalPosts > 0) {
      setPage(totalPages)
      return
    }

    updatePosts()
  }, [page, paginationLimit])

  useEffect(() => {}, [])

  return {
    loading,
    page,
    setPage,
    posts,
    totalPosts,
    setUpdate,
    paginationLimit,
    imageUrls,
  }
}
