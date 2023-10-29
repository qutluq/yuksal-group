'use client'
import { useEffect, useState } from 'react'
import GalleryComponent from 'react-photo-gallery'

import { getGalleryImagesInitialized } from '@/utils/api-client'

import type { GalleryImageInitialized } from '@/types'
export const Gallery = () => {
  const [images, setImages] = useState<GalleryImageInitialized[]>([])
  useEffect(() => {
    getGalleryImagesInitialized().then((response) => {
      setImages(response)
    })
  }, [])
  if (!images) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col">
      <GalleryComponent
        photos={images.map((img) => ({
          src: img.image.href,
          width: img.image.width,
          height: img.image.height,
          columns: 5,
        }))}
      />
    </div>
  )
}
