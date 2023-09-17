'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { getImageClientSide } from '@/utils/api-client'
import {
  DEFAULT_POSTER_POSTS_IMG,
  DEFAULT_POSTER_POSTS_PLACEHOLDER_IMG,
} from '@/utils/settings'

type PropTypes = {
  image: string
}

export const PosterBlog = ({ image }: PropTypes) => {
  const [posterImage, setPosterImage] = useState('')

  useEffect(() => {
    if (!image) {
      setPosterImage(DEFAULT_POSTER_POSTS_IMG)
      return
    }

    if (image.startsWith('/assets')) {
      setPosterImage(image)
      return
    }

    getImageClientSide(image)
      .then(async (response) => {
        const image_blob = await response.blob()
        const imageUrl = URL.createObjectURL(image_blob)
        setPosterImage(imageUrl)
      })
      .catch((error) => {
        console.error(`Can't fetch image: ${error}`)
      })
  }, [image])

  return (
    <Image
      src={posterImage || DEFAULT_POSTER_POSTS_PLACEHOLDER_IMG}
      alt=""
      className="rounded-xl"
      fill
      objectFit="cover"
    />
  )
}
