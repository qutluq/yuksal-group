import Image from 'next/image'
import { HiArrowUpTray } from 'react-icons/hi2'

import { Tooltip } from '@/components/tooltip'

import type { ImageFile } from '@/types'

type PropTypes = {
  file: ImageFile | undefined
  handleOnClick: () => void
}

export const ImageInput = ({ file, handleOnClick }: PropTypes) => (
  <div className="relative flex h-72 w-96 flex-row items-center justify-center rounded-md bg-gray-100 md:w-80">
    <div
      className="absolute z-20 flex h-12 w-12 items-center justify-center rounded-md bg-gray-500 hover:cursor-pointer"
      onClick={handleOnClick}
    >
      <HiArrowUpTray className="text-white" />
    </div>
    {file?.href && (
      <Tooltip text={file?.file?.name || file?.id || ''}>
        {file ? (
          <Image
            src={file?.href || ''}
            alt=""
            className="rounded-sm object-contain"
            fill
          />
        ) : null}
      </Tooltip>
    )}
  </div>
)
