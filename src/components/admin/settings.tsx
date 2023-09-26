'use client'
import { useEffect, useState } from 'react'

import { Button } from '@/components/button'
import { LoadingLogo } from '@/components/fallback'
import { ModalDialog } from '@/components/modal'
import { usePostUnsavedChanges } from '@/hooks/usePostUnsavedChanges'
import type { ImageFile, Settings as DbSettings, SettingsImages } from '@/types'
import type { SettingsInitialized } from '@/types'
import { settingsKeys } from '@/types'
import { translate } from '@/utils'
import {
  getImageClientSide,
  getSettingClientSide,
  revalidateSettingsCache,
  updateSettingsClientSide,
} from '@/utils/api-client'

import { ImageInput } from './image-input'
import { ImageUploadDialog } from './image-upload-dialog'
type UploadModal = {
  closed: boolean
  field: keyof SettingsImages | ''
}

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
    field: '',
  })
  const [unsavedChangesExist, setUnsavedChangesExist] = useState(false)
  const { modalUnsavedlosed, setUnsavedModalClosed, setUnsavedConfirmed } =
    usePostUnsavedChanges(unsavedChangesExist, lang)

  useEffect(() => {
    const imageFields = ['defaultPosterPostsImg', 'defaultCoverPostsImg']
    settingsKeys.map(async (name) => {
      const value = await getSettingClientSide(name)
      if (imageFields.includes(name)) {
        getImageClientSide(value)
          .then(async (response) => {
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

  const setSettingValue = (value: string | number, field: string) => {
    if (field === 'paginationLimit') {
      setSettings((state) => ({ ...state, paginationLimit: value as number }))
      return
    }

    setSettings((state) => ({ ...state, [field]: value }))
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
    } as DbSettings

    updateSettingsClientSide(dbSettings)
      .then(async (response) => {
        if (!response.ok || response.status < 200 || response.status > 299) {
          console.error(`Can not update settings`)
          alert(translate('Failed to update settings', lang))
          return
        }
        setUnsavedChangesExist(false)
        revalidateSettingsCache()
        alert(translate('Settings updated', lang))
      })
      .catch((error) => {
        console.error(`Can not fetch settings: ${error}`)
        alert(translate('Failed to update settings', lang))
      })
  }

  if (!settings) return <LoadingLogo />

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-3">
      <span className="text-2xl">{translate('Site settings', lang)}</span>

      <div className="flex w-[400px] flex-col gap-3 overflow-hidden rounded-lg bg-gray-700 pb-2 md:w-[700px]">
        <span className="bg-gray-500 pl-2 text-lg">
          {translate('Metadata', lang)}
        </span>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 px-2 md:flex-row">
            <label className="w-72" htmlFor="siteName">{`${translate(
              'Site name',
              lang,
            )}: `}</label>
            <input
              id="siteName"
              value={settings.siteName || ''}
              onChange={(e) => {
                setSettingValue(e.target.value, 'siteName')
                setUnsavedChangesExist(true)
              }}
              className="w-96 rounded-sm bg-white pl-2 text-black"
              type="text"
              placeholder="Awesome website"
            />
          </div>

          <div className="flex flex-col gap-2 px-2 md:flex-row">
            <label className="w-72" htmlFor="siteDescription">{`${translate(
              'Site description',
              lang,
            )}: `}</label>
            <input
              id="siteDescription"
              value={settings.siteDescription || ''}
              onChange={(e) => {
                setSettingValue(e.target.value, 'siteDescription')
                setUnsavedChangesExist(true)
              }}
              className="w-96 rounded-sm bg-white pl-2 text-black"
              type="text"
              placeholder="Uyghur ethnic drums and pipes"
            />
          </div>

          <div className="flex flex-col gap-2 px-2 md:flex-row">
            <label className="w-72" htmlFor="siteUrl">{`${translate(
              'Site URL',
              lang,
            )}: `}</label>
            <input
              id="siteUrl"
              value={settings.siteUrl || ''}
              onChange={(e) => {
                setSettingValue(e.target.value, 'siteUrl')
                setUnsavedChangesExist(true)
              }}
              className="w-96 rounded-sm bg-white pl-2 text-black"
              type="text"
              placeholder="www.awesome-website.com"
            />
          </div>
        </div>
      </div>

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
              field="defaultPosterPostsImg"
              setUploadModal={setUploadModal}
              settings={settings}
              setUnsavedChangesExist={setUnsavedChangesExist}
            />
          </div>

          <div className="flex flex-col gap-2 px-2">
            <span className="h-12 w-72 text-sm">{`${translate(
              'Default cover in posts',
              lang,
            )}(1920x480): `}</span>

            <ImageInput
              field="defaultCoverPostsImg"
              setUploadModal={setUploadModal}
              settings={settings}
              setUnsavedChangesExist={setUnsavedChangesExist}
            />
          </div>
        </div>
      </div>

      <div className="flex w-[400px] flex-col gap-3 overflow-hidden rounded-lg bg-gray-700 pb-2 md:w-[700px]">
        <span className="bg-gray-500 pl-2 text-lg">
          {translate('Lists', lang)}
        </span>

        <div className="flex flex-row gap-3 px-2">
          <label className="w-auto" htmlFor="paginationLimit">{`${translate(
            'Items per page, e.g. posts per page on blog page',
            lang,
          )}: `}</label>
          <input
            id="paginationLimit"
            value={settings.paginationLimit || ''}
            onChange={(e) => {
              setSettingValue(e.target.value, 'paginationLimit')
              setUnsavedChangesExist(true)
            }}
            className="w-16 rounded-sm bg-white pl-2 text-black"
            type="number"
            placeholder="100"
          />
        </div>
      </div>

      <div className="flex w-[400px] flex-col gap-3 overflow-hidden rounded-lg bg-gray-700 pb-2 md:w-[700px]">
        <span className="bg-gray-500 pl-2 text-lg">
          {translate('Social network links', lang)}
        </span>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 px-2 md:flex-row">
            <label className="w-72" htmlFor="facebook">{`${translate(
              'Facebook',
              lang,
            )}: `}</label>
            <input
              id="facebook"
              value={settings.facebookLink || ''}
              onChange={(e) => {
                setSettingValue(e.target.value, 'facebookLink')
                setUnsavedChangesExist(true)
              }}
              className="w-96 rounded-sm bg-white pl-2 text-black"
              type="text"
              placeholder="www.facebook.com/yuksal.group"
            />
          </div>

          <div className="flex flex-col gap-2 px-2 md:flex-row">
            <label className="w-72" htmlFor="youtube">{`${translate(
              'Youtube',
              lang,
            )}: `}</label>
            <input
              id="youtube"
              value={settings.youtubeLink || ''}
              onChange={(e) => {
                setSettingValue(e.target.value, 'youtubeLink')
                setUnsavedChangesExist(true)
              }}
              className="w-96 rounded-sm bg-white pl-2 text-black"
              type="text"
              placeholder="www.youtube.com/yuksal.group"
            />
          </div>

          <div className="flex flex-col gap-2 px-2 md:flex-row">
            <label className="w-72" htmlFor="instagram">{`${translate(
              'Instagram',
              lang,
            )}: `}</label>
            <input
              id="instagram"
              value={settings.instagramLink || ''}
              onChange={(e) => {
                setSettingValue(e.target.value, 'instagramLink')
                setUnsavedChangesExist(true)
              }}
              className="w-96 rounded-sm bg-white pl-2 text-black"
              type="text"
              placeholder="www.instagram.com/yuksal.group"
            />
          </div>

          <div className="flex flex-col gap-2 px-2 md:flex-row">
            <label className="w-72" htmlFor="tiktok">{`${translate(
              'Tiktok',
              lang,
            )}: `}</label>
            <input
              id="tiktok"
              value={settings.tiktokLink || ''}
              onChange={(e) => {
                setSettingValue(e.target.value, 'tiktokLink')
                setUnsavedChangesExist(true)
              }}
              className="w-96 rounded-sm bg-white pl-2 text-black"
              type="text"
              placeholder="www.tiktok.com/yuksal.group"
            />
          </div>
        </div>
      </div>

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
        image={settings[uploadModal.field]}
        lang={lang}
        setImage={(img) => setSettingValue(img, uploadModal.field)}
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
