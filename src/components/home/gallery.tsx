'use client'
import './styles.css'

import Image from 'next/image'
import { useState } from 'react'

import { Viewer } from '@/components/gallery'
import { formatDateJS } from '@/utils'

import type { GalleryImageInitialized } from '@/types'

type PropTypes = {
  galleryImages: GalleryImageInitialized[]
}

export const GalleryHome = ({ galleryImages }: PropTypes) => {
  const [viewerVisible, setViewerVisible] = useState(false)

  return (
    <div className="flex h-32 w-full flex-row">
      {galleryImages.map((item) => (
        <div
          key={item.id}
          className="relative w-[25%] border border-black bg-red-500/10"
        >
          <div
            className="thumbnail-caption relative flex  h-full min-h-[70px]  flex-col items-center justify-between py-8"
            onClick={() => {
              if (item?.image?.href) setViewerVisible(true)
            }}
          >
            <span>{item.title}</span>
            <span>{formatDateJS(item.date ? new Date(item.date) : null)}</span>
          </div>
          {item.image?.href !== '' && (
            <div className="absolute h-full w-full overflow-hidden">
              <Image
                src={item.image?.href}
                alt="Gallery Image"
                className="object-cover"
                fill
              />
            </div>
          )}
        </div>
      ))}
      {viewerVisible && (
        <Viewer
          visible={viewerVisible}
          handleOnClose={() => {
            setViewerVisible(false)
          }}
          images={[{ src: '', alt: '' }]}
        />
      )}
    </div>
  )
}
