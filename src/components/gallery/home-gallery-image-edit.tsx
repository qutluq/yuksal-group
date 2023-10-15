'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/button'
import { LoadingLogo } from '@/components/fallback'
import { ImageInput, ImageUploadDialog } from '@/components/image'
import { ModalDialog } from '@/components/modal'
import { usePostUnsavedChanges } from '@/hooks/usePostUnsavedChanges'
import { formatDateJS, translate } from '@/utils'
import {
  getHomeGalleryImageInitialized,
  revalidateImageCache,
  updateGalleryImageClientSide,
} from '@/utils/api-client'

import type { GalleryImageInitialized, UploadModal } from '@/types'
import type { CSSProperties } from 'react'
type PropTypes = {
  lang: string
}

export const HomeGalleryImageEdit = ({ lang }: PropTypes) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [galleryImage, setGalleryImage] = useState<GalleryImageInitialized>({
    id: -1,
    image: { id: '', file: null, href: '' },
    title: '',
    date: new Date(0),
  })
  const [id, setId] = useState<number>(-1)
  const [unsavedChangesExist, setUnsavedChangesExist] = useState(false)
  const [uploadModal, setUploadModal] = useState<UploadModal>({
    closed: true,
    file: undefined,
  })

  const { modal, setModal } = usePostUnsavedChanges(unsavedChangesExist, lang)

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
    getHomeGalleryImageInitialized(id).then((galleryImageInitialized) => {
      if (!galleryImageInitialized) {
        console.error(`Can't fetch gallery image`)
        return
      }
      setGalleryImage(() => ({ ...galleryImageInitialized }))
    })
  }, [id])

  useEffect(() => {
    if (uploadModal.closed) return
    //new image was set in upload dialog
    if (galleryImage.image?.id !== uploadModal.file?.id) {
      setGalleryImage((state) => ({
        ...state,
        image: { ...uploadModal.file! },
      }))
    }
  }, [uploadModal])

  const setField = useCallback(
    (field: keyof GalleryImageInitialized, value: string) => {
      if (field === 'date') {
        setGalleryImage((state) => ({ ...state, [field]: new Date(value) }))
      } else {
        setGalleryImage((state) => ({ ...state, [field]: value }))
      }
      setUnsavedChangesExist(true)
    },
    [],
  )

  const handleSave = useCallback(
    (galleryImage: GalleryImageInitialized, unsavedChangesExist) => {
      if (!unsavedChangesExist) return

      updateGalleryImageClientSide({
        ...galleryImage,
        image: galleryImage.image.id,
      })
        .then(async (response) => {
          if (!response.ok || response.status < 200 || response.status > 299) {
            console.error(`Can not update gallery image`)
            alert(translate('Gallery image can not be saved!', lang))
            return
          }
          setUnsavedChangesExist(false)
          try {
            await revalidateImageCache()
          } catch (error) {
            console.error(`Cache revalidation failed: ${error}`)
            alert(translate('Gallery image can not be saved!', lang))
            return
          }
          alert(translate('Gallery image updated', lang))
          router.push('/admin/home')
        })
        .catch((error) => {
          console.error(`Can not update gallery image: ${error}`)
          alert(translate('Gallery image can not be saved!', lang))
        })
    },
    [lang],
  )

  if (!galleryImage) {
    return <LoadingLogo />
  }

  return (
    <div className="relative flex h-[94vh] w-full flex-col items-center justify-center gap-5">
      <div className="flex w-[50vw] justify-center pb-7 text-center text-3xl">
        {translate('Edit home gallery image', lang)}
      </div>
      <input
        value={galleryImage?.title || ''}
        onChange={(e) => setField('title', e.target.value)}
        className="z-10 w-96 rounded-sm bg-white pl-2 text-xs text-black md:text-base lg:text-lg"
        type="text"
        placeholder={translate('Title', lang)}
      />

      <div style={{ colorScheme: 'only light' } as CSSProperties}>
        <input
          value={formatDateJS(new Date(galleryImage.date))}
          onChange={(e) => {
            setField('date', e.target.value)
          }}
          className="w-[120px] grow rounded-sm text-black"
          type="date"
          placeholder=""
        />
      </div>

      <div className="h-[12.5vw] w-[25vw]">
        <ImageInput
          file={galleryImage.image}
          handleOnClick={() => {
            setUploadModal((state) => ({
              ...state,
              file: galleryImage.image,
              closed: false,
            }))

            setUnsavedChangesExist(true)
          }}
          size={'cover'}
        />
      </div>

      <div className="flex w-full flex-row justify-center">
        <Button
          onClick={() => handleSave(galleryImage, unsavedChangesExist)}
          className="z-10 w-56"
          disabled={!unsavedChangesExist}
        >
          {translate('Save', lang)}
        </Button>
      </div>

      <ImageUploadDialog
        uploadModal={uploadModal}
        setUploadModal={setUploadModal}
        setUnsavedChangesExist={setUnsavedChangesExist}
        lang={lang}
      />

      {!modal.closed && (
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
          onClose={(response) => {
            setModal((state) => ({
              ...state,
              approved: response,
              closed: true,
            }))
          }}
        />
      )}
    </div>
  )
}
