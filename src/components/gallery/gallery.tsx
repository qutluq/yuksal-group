'use client'
import GalleryComponent from 'react-photo-gallery'

import { galleryImages } from './gallery-images'

export const Gallery = () => {
  return (
    <div className="flex flex-col">
      <GalleryComponent
        photos={galleryImages.map((img) => ({
          src: `/assets/images/${img.src}`,
          width: img.width,
          height: img.height,
        }))}
      />
    </div>
  )
}
