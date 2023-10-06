import type { Dispatch, SetStateAction } from 'react'

import { translate } from '@/utils'

import { SettingsSlide } from './settings-slide'

import type { SlideInitialized } from '@/types'
import type { SettingsField, UploadModal } from './types'
type PropTypes = {
  lang: string
  slides: SlideInitialized[]
  setSlide: (index: number, field: string, value: string) => void
  setUploadModal: Dispatch<SetStateAction<UploadModal>>
  setUploadedField: Dispatch<SetStateAction<SettingsField>>
  setUnsavedChangesExist: (boolean) => void
}

export const SettingsHome = ({
  lang,
  slides,
  setSlide,
  setUploadModal,
  setUploadedField,
  setUnsavedChangesExist,
}: PropTypes) => (
  <div className="flex w-[400px] flex-col gap-3 overflow-hidden rounded-lg bg-gray-700 pb-2 md:w-[700px]">
    <span className="bg-gray-500 pl-2 text-lg">
      {translate('Homepage-carousel', lang)}
    </span>

    {slides?.map((slide, idx) => (
      <div className="flex flex-col gap-2 pb-2" key={idx}>
        <span className="rounded-md bg-slate-300/10 py-2 pl-2">{`Slide ${
          idx + 1
        }`}</span>
        <SettingsSlide
          index={idx}
          lang={lang}
          setSlide={setSlide}
          setUploadModal={setUploadModal}
          setUploadedField={setUploadedField}
          setUnsavedChangesExist={setUnsavedChangesExist}
          slide={slide}
        />
      </div>
    ))}
  </div>
)
