'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useContextSettings } from '@/hooks/useContextSettings'
import { getImageClientSide } from '@/utils/api-client'

type PropTypes = {
  bgImg?: string
  children: React.ReactNode
}
export const CoverImageWrapper = ({ bgImg, children }: PropTypes) => {
  const [featuredImage, setFeaturedImage] = useState('')
  const { settings } = useContextSettings()

  useEffect(() => {
    if (!bgImg) {
      setFeaturedImage(settings.defaultCoverPostsImg?.href)
      return
    }
    getImageClientSide(bgImg)
      .then(async (response) => {
        if (!response) return
        const image_blob = await response.blob()
        const imageUrl = URL.createObjectURL(image_blob)
        setFeaturedImage(imageUrl)
      })
      .catch((error) => {
        console.error(`Can't fetch image: ${error}`)
      })
  }, [bgImg, settings])

  return (
    <div
      className={
        'relative flex h-48 w-full flex-col items-center bg-cover bg-center md:h-[480px] md:bg-[var(--color-secondary)]'
      }
    >
      {featuredImage && (
        <div className="absolute h-48 w-full overflow-hidden md:h-[480px]">
          <Image src={featuredImage} alt="" className="object-cover" fill />
        </div>
      )}
      {children}
    </div>
  )
}
