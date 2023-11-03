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
  getGalleryImageInitialized,
  revalidateImageCache,
  saveGalleryImageClientSide,
} from '@/utils/api-client'

import type { GalleryImageInitialized, UploadModal } from '@/types'
import type { CSSProperties } from 'react'
type PropTypes = {
  lang: string
}

export const GalleryImageEdit = ({ lang }: PropTypes) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [galleryImage, setGalleryImage] = useState<GalleryImageInitialized>({
    id: -1,
    src: '',
    image: { id: '', file: null, href: '', width: 0, height: 0 },
    title: '',
    date: new Date(0),
    createdAt: new Date(0),
    tags: [],
  })
  const [id, setId] = useState<number>(-1)
  const [tags, setTags] = useState<string>('')
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
    getGalleryImageInitialized(id).then((galleryImageInitialized) => {
      if (!galleryImageInitialized) {
        console.error(`Can't fetch gallery image`)
        return
      }

      setGalleryImage(() => ({ ...galleryImageInitialized }))
      setTags(() =>
        galleryImageInitialized.tags.map((tag) => `#${tag.name}`).join(' '),
      )
    })
  }, [id])

  useEffect(() => {
    if (uploadModal.closed) return
    //new image was set in upload dialog
    if (galleryImage.image?.id !== uploadModal.file?.id) {
      setGalleryImage((state) => ({
        ...state,
        image: { ...state.image, ...uploadModal.file! },
        src: uploadModal.file?.id ?? '',
      }))
    }
  }, [uploadModal])

  const setField = useCallback(
    (field: keyof GalleryImageInitialized, value: string) => {
      if (field === 'date') {
        setGalleryImage((state) => ({ ...state, [field]: new Date(value) }))
      } else if (field === 'tags') {
        const rawTags = value.split(' ')

        const unallowedSymbols = /[^#a-zA-Z0-9_]/g

        const correctTags = rawTags.map((tag) => {
          if (tag && !tag.startsWith('#')) {
            alert(translate('Tags should start with hashgag(#) sign', lang))
            setTags(() =>
              rawTags
                .filter((item) => item.startsWith('#') && item.length > 1)
                .map((item) => item.substring(1))
                .join(' '),
            )
            return ''
          }

          if (unallowedSymbols.test(tag)) {
            alert(
              translate(
                'Hashtags can only contain letters, numbers, and underscores (_)',
                lang,
              ),
            )
            return tag.replace(unallowedSymbols, '')
          }
          return tag
        })

        setTags(correctTags.join(' '))
      } else {
        setGalleryImage((state) => ({ ...state, [field]: value }))
      }
      setUnsavedChangesExist(true)
    },
    [],
  )

  const handleSave = useCallback(
    (galleryImage: GalleryImageInitialized, unsavedChangesExist, tags) => {
      if (!unsavedChangesExist) return

      //convert tags string into array of tags
      const imageTags =
        tags.length > 0
          ? tags.match(/#\w+/g).map((tag) => tag.slice(1).toLowerCase())
          : []

      //make image field optional & remove it
      const savedGalleryImage = {
        ...galleryImage,
        tags: imageTags,
      } as Partial<Pick<GalleryImageInitialized, 'image'>> &
        Omit<GalleryImageInitialized, 'image'>
      delete savedGalleryImage.image

      saveGalleryImageClientSide({
        ...savedGalleryImage,
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
          router.push('/admin/gallery')
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
        {translate('Edit gallery image', lang)}
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

      <div style={{ colorScheme: 'only light' } as CSSProperties}>
        <textarea
          value={tags}
          onChange={(e) => {
            setField('tags', e.target.value)
          }}
          className="h-24 w-96 grow rounded-sm text-black"
          placeholder={translate('Hashtags', lang)}
        />
      </div>

      <div className="flex w-full flex-row justify-center">
        <Button
          onClick={() => handleSave(galleryImage, unsavedChangesExist, tags)}
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
