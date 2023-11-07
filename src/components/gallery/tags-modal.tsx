'use client'
import './styles.css'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { TagCloud } from 'react-tagcloud'

import { randomInt } from '@/utils'

import type { ImageTag } from '@/types'
type PropTypes = {
  tags: (ImageTag & { images: number[] })[]
  highlightedTags: string[]
  handleClose: () => void
}
type CloudTag = {
  value: string
  count: number
  props: { highlightedTags: string[] }
}

export const TagsModal = ({
  tags,
  highlightedTags,
  handleClose,
}: PropTypes) => {
  const [cloudTags, setCloudTags] = useState<CloudTag[]>([])
  const router = useRouter()
  useEffect(() => {
    setCloudTags(() => [
      ...tags.map((tag) => ({
        value: tag.name,
        count: randomInt(15, 30),
        props: { highlightedTags },
      })),
    ])
  }, [])

  const customRenderer = useCallback((tag, size, color) => {
    const highlighted = tag.props.highlightedTags.includes(tag.value)
    return (
      <span
        key={tag.value}
        style={{
          animation: 'blinker 3s linear infinite',
          animationDelay: `${Math.random() * 2}s`,
          fontSize: highlighted ? '16px' : `${size}px`,
          fontWeight: highlighted ? '700' : '400',
          margin: '3px',
          padding: '3px',
          display: 'inline-block',
          color: highlighted ? '#000' : color,
          backgroundColor: highlighted ? '#fff' : 'none',
          cursor: 'pointer',
        }}
      >
        {`#${tag.value}`}
      </span>
    )
  }, [])

  return (
    <div
      className="fixed left-0 top-0 z-10 flex h-screen w-screen flex-col items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div className="w-96 text-center">
        <TagCloud
          minSize={12}
          maxSize={35}
          tags={cloudTags}
          className="h-10 text-black"
          onClick={(tag) => {
            router.push(`/gallery?tag=${tag.value}`)
          }}
          renderer={customRenderer}
        />
      </div>
    </div>
  )
}
