'use client'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { useEffect, useState } from 'react'

import { LoadingLogo } from '@//components/fallback'
import { Carousel } from '@/components/carousel'
import { NewsSectionHome } from '@/components/news'
import {
  getHomeGalleryImagesInitialized,
  getHomepageSlidesInitialized,
  getNewsThumbnailsInitialized,
} from '@/utils/api-client'

import { GalleryHome } from './gallery'

import type {
  GalleryImageInitialized,
  NewsThumbnailInitialized,
  SlideInitialized,
  UserMode,
} from '@/types'
type PropTypes = {
  lang: string
  mode?: UserMode
}

export const Home = ({ lang, mode = 'user' }: PropTypes) => {
  const [slides, setSlides] = useState<SlideInitialized[]>()
  const [galleryImages, setGalleryImages] =
    useState<GalleryImageInitialized[]>()
  const [newsThumbnails, setNewsThumbnails] = useState<
    NewsThumbnailInitialized[]
  >([])
  useEffect(() => {
    Promise.all([
      getHomepageSlidesInitialized(),
      getHomeGalleryImagesInitialized(),
      getNewsThumbnailsInitialized(),
    ]).then((responses) => {
      setSlides(responses[0])
      setGalleryImages(responses[1])
      setNewsThumbnails(responses[2])
    })
  }, [])
  if (!slides || !galleryImages) {
    return <LoadingLogo />
  }

  return (
    <div className="flex flex-col">
      <Carousel slides={slides} lang={lang} mode={mode} />
      <GalleryHome galleryImages={galleryImages} mode={mode} />
      <NewsSectionHome
        lang={lang}
        mode={mode}
        newsThumbnails={newsThumbnails}
      />
    </div>
  )
}
