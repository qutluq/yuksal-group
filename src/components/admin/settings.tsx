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
  getImageClientSide,
  getSettingClientSide,
  revalidateImageCache,
  revalidateSettingsCache,
  updateSettingsClientSide,
} from '@/utils/api-client'

import { SettingsList } from './settings-list'
import { SettingsMetadata } from './settings-metadata'
import { SettingsSiteImages } from './settings-site-images'
import { SettingsSocial } from './settings-social'

import type {
  Settings as DbSettings,
  ImageFile,
  SettingsInitialized,
  UploadModal,
} from '@/types'
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

  const [activeField, setActiveField] = useState<
    keyof SettingsInitialized | ''
  >('')

  const [unsavedChangesExist, setUnsavedChangesExist] = useState(false)
  const { modalUnsavedlosed, setUnsavedModalClosed, setUnsavedConfirmed } =
    usePostUnsavedChanges(unsavedChangesExist, lang)

  useEffect(() => {
    settingsKeys.map(async (name) => {
      const value = await getSettingClientSide(name)

      const imageFields = ['defaultPosterPostsImg', 'defaultCoverPostsImg']
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

  const setSettingValue = (
    value: string | number | ImageFile,
    field: string,
  ) => {
    if (field === 'paginationLimit') {
      setSettings((state) => ({ ...state, paginationLimit: value as number }))
      return
    }

    setSettings((state) => ({ ...state, [field]: value }))
  }

  useEffect(() => {
    if (uploadModal.closed) return
    //new image was set in upload dialog
    if (uploadModal.file?.id) {
      setSettingValue(uploadModal.file, activeField)
    }
  }, [uploadModal])

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
        setUnsavedChangesExist={setUnsavedChangesExist}
        settings={settings}
        setActiveField={setActiveField}
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
