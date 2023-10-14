import Image from 'next/image'
import { HiArrowUpTray } from 'react-icons/hi2'

import { Tooltip } from '@/components/tooltip'
import { classNames } from '@/utils'

import type { ImageFile } from '@/types'
type PropTypes = {
  file: ImageFile | undefined
  handleOnClick: () => void
  size?: 'standard' | 'cover'
}

export const ImageInput = ({
  file,
  handleOnClick,
  size = 'standard',
}: PropTypes) => (
  <div
    className={classNames(
      'relative flex  flex-row items-center justify-center rounded-md bg-gray-100',
      size == 'standard' && 'h-72 w-96 md:w-80',
      size == 'cover' && 'h-full w-full',
    )}
  >
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
            className={classNames(
              'z-10 rounded-sm',
              size == 'cover' && 'object-cover',
              size == 'standard' && 'object-contain',
            )}
            fill
          />
        ) : null}
      </Tooltip>
    )}
  </div>
)
