'use client'
import './styles.css'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FiEdit } from 'react-icons/fi'

import { Viewer } from '@/components/gallery'
import { formatDateJS } from '@/utils'

import type { GalleryImageInitialized, UserMode } from '@/types'
type PropTypes = {
  galleryImages: GalleryImageInitialized[]
  mode: UserMode
}

export const GalleryHome = ({ galleryImages, mode }: PropTypes) => {
  const [viewerVisible, setViewerVisible] = useState(false)

  return (
    <div className="flex h-32 w-full flex-row">
      {galleryImages.map((item) => (
        <div
          key={item.id}
          className="relative h-[12.5vw] w-[25vw] border border-black bg-red-500/10"
        >
          <div
            className="thumbnail-caption relative z-10  flex h-full  min-h-[70px] flex-col items-center justify-between py-8"
            onClick={() => {
              if (item?.image?.href) setViewerVisible(true)
            }}
          >
            <span>{item.title}</span>
            <span>{formatDateJS(item.date ? new Date(item.date) : null)}</span>
          </div>
          {item.image?.href !== '' && (
            <div className="absolute top-0 h-full w-full overflow-hidden">
              <Image
                src={item.image?.href}
                alt="Gallery Image"
                className="object-cover"
                fill
              />
            </div>
          )}
          {mode === 'admin' && (
            <Link
              href={{
                pathname: '/admin/home-gallery-image',
                query: { id: item.id.toString() },
              }}
            >
              <FiEdit className="absolute right-3 top-3 z-10 h-10 w-10 overflow-hidden text-white" />
            </Link>
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
