import Image from 'next/image'
import Link from 'next/link'

import type { ImageTag } from '@/types'

type PropTypes = {
  photo: {
    key: string
    height: number
    width: number
    src: string
    tags: ImageTag[]
  }
  margin: string
}

const ImageWithCaption = ({ photo, margin }: PropTypes) => {
  return (
    <div
      style={{ margin, height: photo.height, width: photo.width }}
      className="relative overflow-hidden bg-[#eee]"
      key={photo.key}
    >
      <div className="absolute bottom-0 right-0 text-white">
        <div className="flex flex-row gap-2">
          {photo.tags.map((tag) => (
            <Link key={tag.id} href={`/gallery?tag=${tag.name}`}>
              {`#${tag.name}`}
            </Link>
          ))}
        </div>
      </div>
      <Image
        src={photo.src}
        alt={photo.src}
        width={photo.width}
        height={photo.height}
      />
    </div>
  )
}

export default ImageWithCaption
