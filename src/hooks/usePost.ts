import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { usePostClientSide } from '@/hooks/usePostClientSide'
import { useTextEditor } from '@/hooks/useTextEditor'
import type { ImageFile } from '@/types'
import { translate } from '@/utils'
import { updatePostClientSide } from '@/utils/api-client'
export const usePost = (slug: string, lang: string) => {
  const { loading, post, author, setPost } = usePostClientSide(slug)
  const [updateDB, setUpdateDB] = useState(false)
  const { content, setContent, quillRef } = useTextEditor()
  const [title, setTitle] = useState('')
  const [readingTime, setReadingTime] = useState(0)
  const [publishedAt, setPublishedAt] = useState<Date | null>(null)
  const [featuredImage, setFeaturedImage] = useState<ImageFile>()
  const [unsavedChangesExist, setUnsavedChangesExist] = useState(false)
  const [published, setPublished] = useState(false)

  useEffect(() => {
    if (!post) {
      return
    }
    if (updateDB) {
      const { id, ...payload } = post
      updatePostClientSide(id!, payload)
        .then(async (response) => {
          if (response.status > 299 || !response.ok) {
            const { message } = await response.json()
            console.error(
              `Error occured while updating post: ${message}, response status ${response.status}`,
            )
            toast.error(translate('Post can not be saved!', lang))
            return
          }
          toast.success(translate('Post saved!', lang))
          setUnsavedChangesExist(false)
        })
        .finally(() => {
          setUpdateDB(false)
        })
    } else {
      setContent(post.content)
      setTitle(post.title)
      setReadingTime(post.readingTime)
      setPublishedAt(post.publishedAt)
      setFeaturedImage({
        id: post.featuredImage,
        href: '',
        file: null,
      } as ImageFile)
      setPublished(post.published)
    }
  }, [post])

  return {
    state: {
      loading,
      post,
      author,
      setPost,
      updateDB,
      setUpdateDB,
      content,
      setContent,
      quillRef,
      title,
      setTitle,
      readingTime,
      setReadingTime,
      publishedAt,
      setPublishedAt,
      featuredImage,
      setFeaturedImage,
      unsavedChangesExist,
      setUnsavedChangesExist,
      published,
    },
  }
}
