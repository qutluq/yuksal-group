'use client'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { useEffect, useState } from 'react'

import { getHomepageSlidesInitialized } from '@/utils/api-client'

import { Carousel } from './carousel'

import type { SlideInitialized } from '@/types'

type PropTypes = {
  lang: string
}

export const Home = ({ lang }: PropTypes) => {
  const [slides, setSlides] = useState<SlideInitialized[]>()
  useEffect(() => {
    getHomepageSlidesInitialized().then((data) => {
      setSlides(data)
    })
  }, [])
  return (
    <div className="h-[480px] w-full overflow-hidden md:h-[750px] xl:h-[950px]">
      <Carousel slides={slides} lang={lang} />
    </div>
  )
}
