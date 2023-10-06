'use client'
import { useEffect, useState } from 'react'

import { Button } from '@/components/button'
import { LoadingLogo } from '@/components/fallback'
import { ImageUploadDialog } from '@/components/image'
import { ModalDialog } from '@/components/modal'
import { usePostUnsavedChanges } from '@/hooks/usePostUnsavedChanges'
import { settingsKeys } from '@/types'
import { translate } from '@/utils'
import {
  getHomepageSlidesInitialized,
  getImageClientSide,
  getSettingClientSide,
  revalidateImageCache,
  revalidateSettingsCache,
  revalidateSlidesCache,
  updateSettingsClientSide,
} from '@/utils/api-client'

import { SettingsHome } from './settings-home'
import { SettingsList } from './settings-list'
import { SettingsMetadata } from './settings-metadata'
import { SettingsSiteImages } from './settings-site-images'
import { SettingsSocial } from './settings-social'

import type {
  Settings as DbSettings,
  ImageFile,
  SettingsInitialized,
  SlideInitialized,
} from '@/types'
import type { SettingsField, UploadModal } from './types'
type PropTypes = {
  lang: string
}

const addUrlProtocol = (url: string) => {
  if (!url) return ''
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }
  return url
}

export const Settings = ({ lang }: PropTypes) => {
  const [settings, setSettings] = useState<SettingsInitialized>(
    {} as SettingsInitialized,
  )
  const [uploadModal, setUploadModal] = useState<UploadModal>({
    closed: true,
    file: undefined,
  })
  const [uploadedField, setUploadedField] = useState<SettingsField>({
    field: '',
    slideIndex: -1,
  })
  const [unsavedChangesExist, setUnsavedChangesExist] = useState(false)
  const { modalUnsavedlosed, setUnsavedModalClosed, setUnsavedConfirmed } =
    usePostUnsavedChanges(unsavedChangesExist, lang)

  useEffect(() => {
    settingsKeys.map(async (name) => {
      if (name === 'slides') {
        const slidesInitialized = await getHomepageSlidesInitialized()

        setSettings((state) => ({
          ...state,
          slides: slidesInitialized,
        }))

        return
      }
      const value = await getSettingClientSide(name)

      if (imageFields.includes(name)) {
        getImageClientSide(value)
          .then(async (response) => {
            if (!response) return
            const image_blob = await response.blob()
            const imageUrl = URL.createObjectURL(image_blob)
            setSettings((state) => ({
              ...state,
              [name]: {
                file: null,
                id: value,
                href: imageUrl,
              } as ImageFile,
            }))
          })
          .catch((error) => {
            console.error(`Can't fetch image: ${error}`)
          })
      } else {
        setSettings((state) => ({ ...state, [name]: value }))
      }
    })
  }, [])

  const imageFields = ['defaultPosterPostsImg', 'defaultCoverPostsImg']
  const setSettingValue = (
    value: string | number | ImageFile,
    field: string,
  ) => {
    if (field === 'paginationLimit') {
      setSettings((state) => ({ ...state, paginationLimit: value as number }))
      return
    }

    if (field.startsWith('slides')) {
      setSlide(
        uploadedField.slideIndex,
        field.slice(6),
        value as string | ImageFile,
      )
      return
    }

    setSettings((state) => ({ ...state, [field]: value }))
  }

  const setSlide = (
    index: number,
    field: string,
    value: string | ImageFile,
  ) => {
    if (!settings.slides) {
      settings.slides = [] as SlideInitialized[]
    }

    if (settings.slides.length < index + 1) {
      for (let i = Math.max(settings.slides.length - 1, 0); i <= index; i++) {
        settings.slides.push({
          articleSlug: '',
          content: '',
          title: '',
          image: undefined,
        })
      }
    }

    const slide = settings.slides[index]
    const slides = settings.slides
    slides[index] = { ...slide, [field]: value }

    setSettings((state) => ({ ...state, slides: slides }))
  }

  const handleSave = () => {
    if (!unsavedChangesExist) {
      return
    }
    const dbSettings = {
      ...settings,
      facebookLink: addUrlProtocol(settings.facebookLink),
      youtubeLink: addUrlProtocol(settings.youtubeLink),
      instagramLink: addUrlProtocol(settings.instagramLink),
      tiktokLink: addUrlProtocol(settings.tiktokLink),
      defaultPosterPostsImg: settings.defaultPosterPostsImg?.id || '',
      defaultCoverPostsImg: settings.defaultCoverPostsImg?.id || '',
      slides: settings.slides.map((slide) => ({
        ...slide,
        image: slide?.image?.id,
      })),
    } as DbSettings

    updateSettingsClientSide(dbSettings)
      .then(async (response) => {
        if (!response.ok || response.status < 200 || response.status > 299) {
          console.error(`Can not update settings`)
          alert(translate('Failed to update settings', lang))
          return
        }
        setUnsavedChangesExist(false)
        try {
          await revalidateSettingsCache()
          await revalidateSlidesCache()
          await revalidateImageCache()
        } catch (error) {
          console.error(`Cache revalidation failed: ${error}`)
          alert(translate('Failed to update settings', lang))
          return
        }
        alert(translate('Settings updated', lang))
      })
      .catch((error) => {
        console.error(`Can not fetch settings: ${error}`)
        alert(translate('Failed to update settings', lang))
      })
  }

  if (Object.keys(settings).length === 0) return <LoadingLogo />

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-3">
      <span className="text-2xl">{translate('Site settings', lang)}</span>

      <SettingsMetadata
        lang={lang}
        setSettingValue={setSettingValue}
        setUnsavedChangesExist={setUnsavedChangesExist}
        settings={settings}
      />

      <SettingsSiteImages
        lang={lang}
        setUploadModal={setUploadModal}
        setUploadedField={setUploadedField}
        setUnsavedChangesExist={setUnsavedChangesExist}
        settings={settings}
      />

      <SettingsList
        lang={lang}
        setSettingValue={setSettingValue}
        setUnsavedChangesExist={setUnsavedChangesExist}
        settings={settings}
      />

      <SettingsSocial
        lang={lang}
        setSettingValue={setSettingValue}
        setUnsavedChangesExist={setUnsavedChangesExist}
        settings={settings}
      />

      <SettingsHome
        lang={lang}
        setSlide={setSlide}
        setUploadModal={setUploadModal}
        setUnsavedChangesExist={setUnsavedChangesExist}
        setUploadedField={setUploadedField}
        slides={settings?.slides}
      />

      <div className="flex w-full flex-row justify-center">
        <Button
          onClick={handleSave}
          className="w-56"
          disabled={!unsavedChangesExist}
        >
          {translate('Save', lang)}
        </Button>
      </div>

      <ImageUploadDialog
        uploadModalClosed={uploadModal.closed}
        setUploadModalClosed={(c) =>
          setUploadModal((state) => ({ ...state, closed: c }))
        }
        image={uploadModal.file}
        lang={lang}
        setImage={(img) => setSettingValue(img, uploadedField.field)}
        setUnsavedChangesExist={setUnsavedChangesExist}
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
