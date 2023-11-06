'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import GalleryComponent from 'react-photo-gallery'

import { Viewer } from '@/components/gallery'
import { getGalleryImagesInitialized } from '@/utils/api-client'

import ImageWithCaption from './image-with-caption'

import type { GalleryImageInitialized } from '@/types'
export const Gallery = () => {
  const [images, setImages] = useState<GalleryImageInitialized[]>()
  const [viewerVisible, setViewerVisible] = useState(false)
  const [viewerIdx, setViewerIdx] = useState(0)
  const searchParams = useSearchParams()
  const [tagFilter, setTagFilter] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (tagFilter === undefined) return

    getGalleryImagesInitialized(tagFilter ?? '')
      .then((response) => {
        setImages(response)
      })
      .catch((error) => {
        console.error(`Fetch failed: ${error}`)
      })
  }, [tagFilter])

  useEffect(() => {
    if (!searchParams.get('tag')) {
      setTagFilter('')
      return
    }
    setTagFilter(searchParams.get('tag')!)
  }, [searchParams])

  const openLightbox = useCallback((event, { index }) => {
    setViewerIdx(index)
    setViewerVisible(true)
  }, [])

  const imageRenderer = useCallback(
    ({ photo }) => (
      <ImageWithCaption photo={photo} margin={'2px'} key={photo.key} />
    ),
    [],
  )

  if (!images) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col">
      {!tagFilter ? null : (
        <div className="flex w-full flex-row justify-center py-3">
          <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-white px-3">
            <span className="pt-[1.5px] text-black">{tagFilter}</span>
            <Link href="/gallery">
              <RxCross1 className="h-5  text-black" />
            </Link>
          </div>
        </div>
      )}
      <GalleryComponent
        photos={images.map((img) => ({
          src: img.image.href,
          width: img.image.width,
          height: img.image.height,
          key: img.id.toString(),
          tags: img.tags,
        }))}
        columns={5}
        onClick={openLightbox}
        renderImage={imageRenderer}
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
