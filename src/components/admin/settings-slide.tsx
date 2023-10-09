import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

import { translate } from '@/utils'

import { ImageInput } from '../image'

import type { ImageFile, SlideInitialized, UploadModal } from '@/types'
import type { SettingsField } from './types'
type PropTypes = {
  lang: string
  index: number
  slide: SlideInitialized
  setSlide: (index: number, field: string, value: string) => void
  setUploadModal: Dispatch<SetStateAction<UploadModal>>
  setUploadedField: Dispatch<SetStateAction<SettingsField>>
  setUnsavedChangesExist: (boolean) => void
}
export const SettingsSlide = ({
  lang,
  index,
  slide,
  setSlide,
  setUploadModal,
  setUploadedField,
  setUnsavedChangesExist,
}: PropTypes) => {
  const [image, setImage] = useState<ImageFile>()

  useEffect(() => {
    if (!slide?.image) {
      return
    }
    setImage(() => ({ ...slide.image! }))
  }, [slide])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 px-2 md:flex-row">
        <label
          className="w-72"
          htmlFor={`slide${index + 1}Title`}
        >{`${translate('Title', lang)}: `}</label>
        <input
          id={`slide${index + 1}Title`}
          value={slide?.title || ''}
          onChange={(e) => {
            setSlide(index, 'title', e.target.value)
            setUnsavedChangesExist(true)
          }}
          className="w-96 rounded-sm bg-white pl-2 text-black"
          type="text"
          placeholder="Slide title"
        />
      </div>
      <div className="flex flex-col gap-2 px-2 md:flex-row">
        <label
          className="w-72"
          htmlFor={`slide${index + 1}Content`}
        >{`${translate('Content', lang)}: `}</label>
        <input
          id={`slide${index + 1}Content`}
          value={slide?.content || ''}
          onChange={(e) => {
            setSlide(index, 'content', e.target.value)
            setUnsavedChangesExist(true)
          }}
          className="w-96 rounded-sm bg-white pl-2 text-black"
          type="text"
          placeholder="Slide content"
        />
      </div>
      <div className="flex flex-col gap-2 px-2 md:flex-row">
        <label className="w-72" htmlFor={`slide${index + 1}Slug`}>{`${translate(
          'Slug',
          lang,
        )}: `}</label>
        <input
          id={`slide${index + 1}Slug`}
          value={slide?.articleSlug || ''}
          onChange={(e) => {
            setSlide(index, 'articleSlug', e.target.value)
            setUnsavedChangesExist(true)
          }}
          className="w-96 rounded-sm bg-white pl-2 text-black"
          type="text"
          placeholder="Slide article slug"
        />
      </div>
      <div className="flex flex-row gap-2 px-2">
        <span className="h-12 w-72 text-sm">{`${translate(
          'Slide background',
          lang,
        )}(1920X950): `}</span>

        <div className="flex w-full justify-end">
          <ImageInput
            file={image}
            handleOnClick={() => {
              setUploadModal((state) => ({
                ...state,
                file: image,
                closed: false,
              }))
              setUploadedField((state) => ({
                ...state,
                field: 'slidesimage',
                slideIndex: index,
              }))

              setUnsavedChangesExist(true)
            }}
          />
        </div>
      </div>
    </div>
  )
}
