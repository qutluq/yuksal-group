import Image from 'next/image'
import { HiArrowUpTray } from 'react-icons/hi2'

import { Tooltip } from '@/components/tooltip'

import type { Settings } from './types'

type PropTypes = {
  settings: Settings
  field:
    | 'defaultPosterPostsImg'
    | 'defaultPosterPostsPlaceholderImg'
    | 'defaultCoverPostsImg'
    | 'defaultCoverPostsPlaceholderImg'
    | 'logoImg'
  setUploadModal: (object) => void
  setUnsavedChangesExist: (boolean) => void
}

export const ImageInput = ({
  settings,
  field,
  setUploadModal,
  setUnsavedChangesExist,
}: PropTypes) => {
  return (
    <div className="relative flex h-72 w-96 flex-row items-center justify-center rounded-md bg-gray-100 md:w-80">
      <div
        className="absolute z-20 flex h-12 w-12 items-center justify-center rounded-md bg-gray-500 hover:cursor-pointer"
        onClick={() => {
          setUploadModal((state) => ({
            ...state,
            closed: false,
            field: field,
          }))
          setUnsavedChangesExist(true)
        }}
      >
        <HiArrowUpTray className="text-white" />
      </div>
      {settings[field]?.href && (
        <Tooltip
          text={settings[field]?.file?.name || settings[field]?.id || ''}
        >
          <Image
            src={settings[field]?.href || ''}
            alt=""
            className="rounded-sm object-contain"
            fill
          />
        </Tooltip>
      )}
    </div>
  )
}
