import Image from 'next/image'
import type { Dispatch, SetStateAction } from 'react'

import { Tooltip } from '@/components/tooltip'
import type { ImageFile } from '@/types'
import { translate } from '@/utils'

import { FileInputButton } from './file-input-button'
type PropTypes = {
  images: { string: string } | object
  chosenImage: ImageFile | undefined
  lang: string
  setChosenImage: Dispatch<SetStateAction<ImageFile | undefined>>
  setDuplicateName: Dispatch<SetStateAction<string>>
}

export const ChosenImage = ({
  images,
  lang,
  chosenImage,
  setDuplicateName,
  setChosenImage,
}: PropTypes) => {
  const handleInputChange = (e) => {
    const img = e.target.files?.[0]
    if (!img) {
      return
    }

    const imageUrl = URL.createObjectURL(img)
    setChosenImage({ href: imageUrl, id: '', file: img })
    if (images[img.name]) {
      setDuplicateName(img.name)
      alert(
        `${translate(
          'A file with this name is already present on the server:',
          lang,
        )} ${img.name}`,
      )
    } else {
      setDuplicateName('')
    }
  }

  return (
    <div className="relative flex h-72 w-72 flex-row items-center justify-center rounded-md bg-gray-100">
      <div className="absolute z-30 opacity-90 hover:opacity-100">
        <FileInputButton onChange={handleInputChange} acceptType="images" />
      </div>
      {chosenImage && chosenImage.href && (
        <Tooltip text={chosenImage?.file?.name || chosenImage?.id || ''}>
          <Image
            src={chosenImage.href}
            alt=""
            className="rounded-sm object-contain"
            fill
          />
        </Tooltip>
      )}
    </div>
  )
}
