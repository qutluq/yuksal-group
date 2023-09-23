'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useContextSettings } from '@/hooks/useContextSettings'

type PropTypes = {
  image: string
  imageUrls: { [key: string]: string }
}

export const PosterBlog = ({ image, imageUrls }: PropTypes) => {
  const [posterImage, setPosterImage] = useState('')
  const { settings, initialized } = useContextSettings()

  useEffect(() => {
    if (!initialized) return
    if (!image) {
      setPosterImage(settings.defaultPosterPostsImg?.href)
      return
    }

    if (image.startsWith('/assets')) {
      setPosterImage(image)
      return
    }
    setPosterImage(imageUrls[image])
  }, [image, imageUrls, initialized])

  return (
    <Image
      src={posterImage || settings.defaultPosterPostsImg?.href}
      alt=""
      className="rounded-xl"
      fill
      objectFit="cover"
    />
  )
}
