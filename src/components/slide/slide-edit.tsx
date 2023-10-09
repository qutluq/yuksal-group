'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/button'
import { LoadingLogo } from '@/components/fallback'
import { ImageInput, ImageUploadDialog } from '@/components/image'
import { ModalDialog } from '@/components/modal'
import { usePostUnsavedChanges } from '@/hooks/usePostUnsavedChanges'
import { translate } from '@/utils'
import {
  getHomepageSlideInitialized,
  revalidateImageCache,
  revalidateSlidesCache,
  updateSlideClientSide,
} from '@/utils/api-client'

import type { SlideInitialized, UploadModal } from '@/types'
type PropTypes = {
  lang: string
}

export const SlideEdit = ({ lang }: PropTypes) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [slide, setSlide] = useState<SlideInitialized>({
    id: -1,
    articleSlug: '',
    content: '',
    image: { id: '', file: null, href: '' },
    title: '',
  })
  const [id, setId] = useState<number>(-1)
  const [unsavedChangesExist, setUnsavedChangesExist] = useState(false)
  const [uploadModal, setUploadModal] = useState<UploadModal>({
    closed: true,
    file: undefined,
  })

  const { modalUnsavedlosed, setUnsavedModalClosed, setUnsavedConfirmed } =
    usePostUnsavedChanges(unsavedChangesExist, lang)

  useEffect(() => {
    if (searchParams) {
      const paramId = searchParams.get('id')
      if (paramId !== null) {
        setId(parseInt(paramId))
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (id === -1) return
    getHomepageSlideInitialized(id).then((slideInitialized) => {
      setSlide(() => ({ ...slideInitialized }))
    })
  }, [id])

  useEffect(() => {
    if (uploadModal.closed) return
    //new image was set in upload dialog
    if (slide.image?.id !== uploadModal.file?.id) {
      setSlide((state) => ({ ...state, image: { ...uploadModal.file! } }))
    }
  }, [uploadModal])

  const setField = useCallback(
    (field: keyof SlideInitialized, value: string) => {
      setSlide((state) => ({ ...state, [field]: value }))
      setUnsavedChangesExist(true)
    },
    [],
  )

  const handleSave = useCallback(
    (slide, unsavedChangesExist) => {
      if (!unsavedChangesExist) return

      updateSlideClientSide({ ...slide, image: slide.image.id })
        .then(async (response) => {
          if (!response.ok || response.status < 200 || response.status > 299) {
            console.error(`Can not update slide`)
            alert(translate('Slide can not be saved!', lang))
            return
          }
          setUnsavedChangesExist(false)
          try {
            await revalidateSlidesCache()
            await revalidateImageCache()
          } catch (error) {
            console.error(`Cache revalidation failed: ${error}`)
            alert(translate('Slide can not be saved!', lang))
            return
          }
          alert(translate('Slide updated', lang))
          router.push('/admin/home')
        })
        .catch((error) => {
          console.error(`Can not update slide: ${error}`)
          alert(translate('Slide can not be saved!', lang))
        })
    },
    [lang],
  )

  if (!slide) {
    return <LoadingLogo />
  }

  return (
    <div className="h-full w-full">
      <div className="relative top-32 flex flex-col items-center justify-center gap-6 text-white md:gap-8 lg:gap-10">
        <input
          value={slide?.title || ''}
          onChange={(e) => setField('title', e.target.value)}
          className="z-10 w-96 rounded-sm bg-white pl-2 text-xs text-black md:text-base lg:text-lg"
          type="text"
          placeholder={translate('Title', lang)}
        />

        <input
          value={slide?.content || ''}
          onChange={(e) => setField('content', e.target.value)}
          className="z-10 w-[900px] rounded-sm bg-white pl-2 text-2xl text-black md:text-5xl lg:text-8xl"
          type="text"
          placeholder={translate('Content', lang)}
        />

        <input
          value={slide?.articleSlug || ''}
          onChange={(e) => setField('articleSlug', e.target.value)}
          className="z-10 w-80 rounded-sm bg-white pl-2 text-black"
          type="text"
          placeholder={translate('Slug', lang)}
        />
        <ImageInput
          file={slide.image}
          handleOnClick={() => {
            setUploadModal((state) => ({
              ...state,
              file: slide.image,
              closed: false,
            }))

            setUnsavedChangesExist(true)
          }}
        />

        <div className="flex w-full flex-row justify-center">
          <Button
            onClick={() => handleSave(slide, unsavedChangesExist)}
            className="z-10 w-56"
            disabled={!unsavedChangesExist}
          >
            {translate('Save', lang)}
          </Button>
        </div>
      </div>

      {slide?.image?.href && (
        <div className="z-0 h-[570px] w-full overflow-hidden md:h-[570px] xl:h-[950px]">
          <Image
            src={slide?.image?.href}
            alt=""
            className="object-cover"
            fill
          />
        </div>
      )}

      <ImageUploadDialog
        uploadModal={uploadModal}
        setUploadModal={setUploadModal}
        setUnsavedChangesExist={setUnsavedChangesExist}
        lang={lang}
      />

      {!modalUnsavedlosed && (
        <ModalDialog
          title={translate('Unsaved changes', lang)}
          body={
            <div className="flex flex-col items-center">
              {translate(
                'Changes are unsaved. Are you sure you want to leave the page?',
                lang,
              )}
            </div>
          }
          btnTitleAgree={translate('Yes', lang)}
          btnTitleCancel={translate('Cancel', lang)}
          setConfirmed={setUnsavedConfirmed}
          setModalClosed={setUnsavedModalClosed}
        />
      )}
    </div>
  )
}
