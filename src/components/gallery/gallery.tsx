'use client'
import { useCallback, useEffect, useState } from 'react'
import GalleryComponent from 'react-photo-gallery'

import { Viewer } from '@/components/gallery'
import { getGalleryImagesInitialized } from '@/utils/api-client'

import type { GalleryImageInitialized } from '@/types'
export const Gallery = () => {
  const [images, setImages] = useState<GalleryImageInitialized[]>()
  const [viewerVisible, setViewerVisible] = useState(false)
  const [viewerIdx, setViewerIdx] = useState(0)

  useEffect(() => {
    getGalleryImagesInitialized()
      .then((response) => {
        setImages(response)
      })
      .catch((error) => {
        console.error(`Fetch failed: ${error}`)
      })
  }, [])

  const openLightbox = useCallback((event, { index }) => {
    setViewerIdx(index)
    setViewerVisible(true)
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
        onClick={openLightbox}
      />
      {viewerVisible ? (
        <Viewer
          visible={viewerVisible}
          handleOnClose={() => {
            setViewerIdx(0)
            setViewerVisible(false)
          }}
          images={images.map((img) => ({
            src: img?.image?.href,
            alt: img?.image?.id,
          }))}
          activeIndex={viewerIdx}
        />
      ) : null}
    </div>
  )
}
