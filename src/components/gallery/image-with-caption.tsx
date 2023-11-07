'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/button'

import { TagsModal } from './tags-modal'

import type { ImageTag } from '@/types'
type PropTypes = {
  photo: {
    key: string
    height: number
    width: number
    src: string
    tags: ImageTag[]
    allTags: (ImageTag & { images: number[] })[]
  }
  margin: string
}

const ImageWithCaption = ({ photo, margin }: PropTypes) => {
  const [tagsVisible, setTagsVisible] = useState(false)

  return (
    <div
      style={{ margin, height: photo.height, width: photo.width }}
      className="relative overflow-hidden bg-[#eee]"
      key={photo.key}
    >
      <div className="absolute bottom-0 right-0 text-white">
        <div className="flex flex-row items-center gap-2">
          {photo.tags.map((tag) => (
            <Link key={tag.id} href={`/gallery?tag=${tag.name}`}>
              {`#${tag.name}`}
            </Link>
          ))}
          <Button
            className="tracking-tight text-white"
            onClick={() => {
              setTagsVisible(true)
            }}
            variant="text"
            title="..."
          ></Button>
        </div>
      </div>
      <Image
        src={photo.src}
        alt={photo.src}
        width={photo.width}
        height={photo.height}
      />
      {!tagsVisible ? null : (
        <TagsModal
          tags={photo.allTags.filter((tag) => tag.images.length > 0)}
          highlightedTags={photo.tags.map((tag) => tag.name)}
          handleClose={() => setTagsVisible(false)}
        />
      )}
    </div>
  )
}

export default ImageWithCaption
