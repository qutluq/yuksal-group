'use client'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { useEffect, useState } from 'react'

import { LoadingLogo } from '@//components/fallback'
import { Carousel } from '@/components/carousel'
import {
  getHomeGalleryImagesInitialized,
  getHomepageSlidesInitialized,
} from '@/utils/api-client'

import { GalleryHome } from './gallery'

import type { GalleryImageInitialized, SlideInitialized } from '@/types'
type PropTypes = {
  lang: string
  mode?: 'user' | 'admin'
}

export const Home = ({ lang, mode = 'user' }: PropTypes) => {
  const [slides, setSlides] = useState<SlideInitialized[]>()
  const [galleryImages, setGalleryImages] =
    useState<GalleryImageInitialized[]>()
  useEffect(() => {
    Promise.all([
      getHomepageSlidesInitialized(),
      getHomeGalleryImagesInitialized(),
    ]).then((responses) => {
      setSlides(responses[0])
      setGalleryImages(responses[1])
    })
  }, [])
  if (!slides || !galleryImages) {
    return <LoadingLogo />
  }

  return (
    <div className="flex flex-col">
      <Carousel slides={slides} lang={lang} mode={mode} />
      <GalleryHome galleryImages={galleryImages} />
    </div>
  )
}
