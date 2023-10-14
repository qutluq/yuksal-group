'use client'
import './styles.css'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FiEdit } from 'react-icons/fi'

import { Viewer } from '@/components/gallery'
import { formatDate } from '@/utils'

import type { GalleryImageInitialized, UserMode } from '@/types'
type PropTypes = {
  galleryImages: GalleryImageInitialized[]
  mode: UserMode
}

export const GalleryHome = ({ galleryImages, mode }: PropTypes) => {
  const [viewerVisible, setViewerVisible] = useState(false)

  return (
    <div className="flex w-full flex-row">
      {galleryImages.map((item) => (
        <div
          key={item.id}
          className="relative h-[18.75vw] w-[25vw] overflow-hidden border border-black bg-red-500/10"
        >
          <div
            className="thumbnail-caption relative z-10  flex h-full  min-h-[70px]  items-center justify-center py-8 font-bold uppercase"
            onClick={() => {
              if (item?.image?.href) setViewerVisible(true)
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xl">{item.title}</span>
              <span className="h-[2px] w-10 bg-sky-500" />
              <span className="font-thin">
                {formatDate(item.date ? new Date(item.date) : null)}
              </span>
            </div>
          </div>
          {item.image?.href !== '' && (
            <div className="absolute top-0 h-full w-[25vw] overflow-hidden">
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
