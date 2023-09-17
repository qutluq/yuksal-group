'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { classNames } from '@/utils'
import { getImageClientSide } from '@/utils/api-client'
import { DEFAULT_COVER_POSTS_PLACEHOLDER_IMG } from '@/utils/settings'

type PropTypes = {
  bgImg: string
  children: React.ReactNode
}
export const CoverImageWrapper = ({ bgImg, children }: PropTypes) => {
  const [featuredImage, setFeaturedImage] = useState('')

  useEffect(() => {
    if (!bgImg) {
      return
    }
    getImageClientSide(bgImg)
      .then(async (response) => {
        const image_blob = await response.blob()
        const imageUrl = URL.createObjectURL(image_blob)
        setFeaturedImage(imageUrl)
      })
      .catch((error) => {
        console.error(`Can't fetch image: ${error}`)
      })
  }, [bgImg])

  return (
    <div
      className={
        'relative flex h-48 w-full flex-col items-center bg-cover bg-center md:h-[480px] md:bg-[var(--color-secondary)]'
      }
    >
      <div className="absolute h-48 w-full overflow-hidden md:h-[480px]">
        <Image
          src={featuredImage || DEFAULT_COVER_POSTS_PLACEHOLDER_IMG}
          alt=""
          className={classNames('object-cover', !featuredImage && 'opacity-0')}
          fill
        />
      </div>
      {children}
    </div>
  )
}
