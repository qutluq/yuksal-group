'use client'
import { useEffect, useState } from 'react'

import type { Post } from '@/types/blog'
import type { User } from '@/types/user'
import { getPostClientSide } from '@/utils/api'
export const usePostClientSide = (slug: string) => {
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState<Post | undefined>(undefined)
  const [author, setAuthor] = useState<User | undefined>(undefined)
  useEffect(() => {
    getPostClientSide(slug)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        const { post, author } = data
        setPost(post)
        setAuthor(author)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { loading, post, author, setPost }
}
