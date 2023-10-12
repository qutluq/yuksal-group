'use client'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { useEffect, useState } from 'react'

import { Carousel } from '@/components/carousel'
import { getHomepageSlidesInitialized } from '@/utils/api-client'

import { LoadingLogo } from '../fallback'

import type { SlideInitialized } from '@/types'
type PropTypes = {
  lang: string
  mode?: 'user' | 'admin'
}

export const Home = ({ lang, mode = 'user' }: PropTypes) => {
  const [slides, setSlides] = useState<SlideInitialized[]>()
  useEffect(() => {
    getHomepageSlidesInitialized().then((data) => {
      setSlides(data)
    })
  }, [])
  if (!slides) {
    return <LoadingLogo />
  }
  return <Carousel slides={slides} lang={lang} mode={mode} />
}
