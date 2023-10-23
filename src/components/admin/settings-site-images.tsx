import type { Dispatch, SetStateAction } from 'react'

import { ImageInput } from '@/components/image/image-input'
import type { SettingsInitialized } from '@/types'
import { translate } from '@/utils'

import type { UploadModal } from '@/types'

type PropTypes = {
  lang: string
  settings: SettingsInitialized
  setUnsavedChangesExist: (boolean) => void
  setUploadModal: Dispatch<SetStateAction<UploadModal>>
  setActiveField: Dispatch<SetStateAction<keyof SettingsInitialized | ''>>
}
export const SettingsSiteImages = ({
  lang,
  settings,
  setUnsavedChangesExist,
  setUploadModal,
  setActiveField,
}: PropTypes) => (
  <div className="flex w-[400px] flex-col gap-3 overflow-hidden rounded-lg bg-gray-700 pb-2 md:w-[700px]">
    <span className="w-full bg-gray-500 pl-2 text-lg">
      {translate('Images', lang)}
    </span>

    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <div className="flex flex-col gap-2 px-2">
        <span className="h-12 w-72 text-sm">{`${translate(
          'Default poster in posts',
          lang,
        )}(450x300): `}</span>

        <ImageInput
          file={settings.defaultPosterPostsImg}
          handleOnClick={() => {
            setUploadModal((state) => ({
              ...state,
              file: settings.defaultPosterPostsImg,
              closed: false,
            }))
            setActiveField('defaultPosterPostsImg')
            setUnsavedChangesExist(true)
          }}
        />
      </div>

      <div className="flex flex-col gap-2 px-2">
        <span className="h-12 w-72 text-sm">{`${translate(
          'Default cover in posts',
          lang,
        )}(1920x480): `}</span>

        <ImageInput
          file={settings.defaultCoverPostsImg}
          handleOnClick={() => {
            setUploadModal((state) => ({
              ...state,
              file: settings.defaultCoverPostsImg,
              closed: false,
            }))
            setActiveField('defaultCoverPostsImg')
            setUnsavedChangesExist(true)
          }}
        />
      </div>
    </div>
  </div>
)
