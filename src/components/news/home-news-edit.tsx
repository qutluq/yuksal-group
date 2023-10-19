'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/button'
import { LoadingLogo } from '@/components/fallback'
import { ImageInput, ImageUploadDialog } from '@/components/image'
import { ModalDialog } from '@/components/modal'
import { usePostUnsavedChanges } from '@/hooks/usePostUnsavedChanges'
import { formatDateJS, getTimeJS, translate } from '@/utils'
import {
  getNewsThumbnailInitialized,
  revalidateImageCache,
  updateNewsThumbnailClientSide,
} from '@/utils/api-client'

import type { NewsThumbnailInitialized, UploadModal } from '@/types'
import type { CSSProperties } from 'react'
type PropTypes = {
  isNew: boolean
  lang: string
}

type Time = {
  hours: number
  minutes: number
}

export const HomeNewsEdit = ({ isNew, lang }: PropTypes) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [time, setTime] = useState<Time>({ hours: 0, minutes: 0 })
  const [newsThumbnail, setNewsThumbnail] = useState<NewsThumbnailInitialized>({
    id: -1,
    image: { id: '', file: null, href: '' },
    title: '',
    url: '',
    date: new Date(0),
  })
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
        const id = parseInt(paramId)

        if (isNew) {
          setNewsThumbnail((state) => ({ ...state, id: id }))
          setIsLoading(false)
          return
        }

        setIsLoading(true)

        setNewsThumbnail((state) => ({ ...state, id: id }))

        getNewsThumbnailInitialized(id)
          .then((newsThumbnailInitialized) => {
            if (!newsThumbnailInitialized) {
              console.error(`Can't fetch news thumbnail id:${id}`)
              return
            }
            setTime(() => ({
              hours: newsThumbnailInitialized.date.getHours(),
              minutes: newsThumbnailInitialized.date.getMinutes(),
            }))

            setNewsThumbnail(() => ({ ...newsThumbnailInitialized }))
          })
          .finally(() => {
            setIsLoading(false)
          })
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (uploadModal.closed) return
    //new image was set in upload dialog
    if (newsThumbnail.image?.id !== uploadModal.file?.id) {
      setNewsThumbnail((state) => ({
        ...state,
        image: { ...uploadModal.file! },
      }))
    }
  }, [uploadModal])

  const setField = useCallback(
    (field: keyof NewsThumbnailInitialized | 'time', value: string) => {
      if (field === 'date') {
        const timezoneOffsetMs = new Date().getTimezoneOffset() * 60 * 1000
        const newDate = new Date(
          new Date(value).getTime() +
            time.hours * 60 * 60 * 1000 +
            time.minutes * 60 * 1000 +
            timezoneOffsetMs,
        )

        setNewsThumbnail((state) => ({ ...state, date: newDate }))
      } else if (field === 'time') {
        const [hours, minutes] = value.split(':').map((t) => parseInt(t))
        const timezoneOffsetMs = new Date().getTimezoneOffset() * 60 * 1000

        const newDate = new Date(
          new Date(
            new Date(newsThumbnail.date.getTime() + 21600000)
              .toISOString()
              .slice(0, 10),
          ).getTime() +
            hours * 60 * 60 * 1000 +
            minutes * 60 * 1000 +
            timezoneOffsetMs,
        )

        setNewsThumbnail((state) => ({ ...state, date: newDate }))
        setTime(() => ({ hours, minutes }))
      } else {
        setNewsThumbnail((state) => ({ ...state, [field]: value }))
      }
      setUnsavedChangesExist(true)
    },
    [time, newsThumbnail],
  )

  const handleSave = useCallback(
    (newsThumbnail: NewsThumbnailInitialized, unsavedChangesExist) => {
      if (!unsavedChangesExist) return

      updateNewsThumbnailClientSide({
        ...newsThumbnail,
        image: newsThumbnail.image.id,
      })
        .then(async (response) => {
          if (!response.ok || response.status < 200 || response.status > 299) {
            console.error(`Can not update news thumbnail`)
            alert(translate('News thumbnail can not be saved!', lang))
            return
          }
          setUnsavedChangesExist(false)
          try {
            await revalidateImageCache()
          } catch (error) {
            console.error(`Cache revalidation failed: ${error}`)
            alert(translate('News thumbnail can not be saved!', lang))
            return
          }
          alert(translate('News thumbnail saved', lang))
          router.push('/admin/home')
        })
        .catch((error) => {
          console.error(`Can not update news thumbnail: ${error}`)
          alert(translate('News thumbnail can not be saved!', lang))
        })
    },
    [lang],
  )

  if (isLoading) {
    return <LoadingLogo />
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
      <div className="flex w-[50vw] justify-center pb-7 text-center text-3xl">
        {translate('Edit home news thumbnail', lang)}
      </div>
      <div className="news-section relative flex h-[500px]  w-80 flex-col items-center justify-center">
        <div className="relative h-[50%] w-full overflow-hidden bg-gray-700">
          <ImageInput
            file={newsThumbnail.image}
            handleOnClick={() => {
              setUploadModal((state) => ({
                ...state,
                file: newsThumbnail.image,
                closed: false,
              }))

              setUnsavedChangesExist(true)
            }}
            size={'cover'}
          />
        </div>
        <span className="absolute top-0 flex h-full items-center justify-center">
          <span
            className="z-10 flex h-10 flex-row items-center justify-center gap-3 rounded-3xl bg-[var(--color-primary)] p-3 text-sm md:p-3 lg:p-5 lg:text-base"
            style={{ colorScheme: 'only light' } as CSSProperties}
          >
            <input
              value={formatDateJS(new Date(newsThumbnail.date))}
              onChange={(e) => {
                setField('date', e.target.value)
              }}
              className="w-[120px] grow rounded-sm text-black"
              type="date"
              placeholder=""
            />

            <input
              value={getTimeJS(new Date(newsThumbnail.date))}
              onChange={(e) => {
                setField('time', e.target.value)
              }}
              className="w-[120px] grow rounded-sm text-black"
              type="time"
              placeholder="23:59"
            />
          </span>
        </span>
        <div className="flex h-[50%] w-full flex-col items-center justify-center gap-6 bg-white text-[var(--color-secondary)]">
          <input
            value={newsThumbnail?.title || ''}
            onChange={(e) => setField('title', e.target.value)}
            className="z-20 w-64 rounded-sm bg-white pl-2 text-center font-bold uppercase"
            type="text"
            placeholder={translate('Title', lang)}
          />
          <span className="h-[1px] w-[145px] bg-black/10" />
          <input
            value={newsThumbnail?.url || ''}
            onChange={(e) => setField('url', e.target.value)}
            className="z-10 w-full rounded-sm bg-white pl-2 text-xs text-black md:text-base lg:text-lg"
            type="text"
            placeholder={translate('Article URL', lang)}
          />
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
      <div className="flex w-full flex-row justify-center">
        <Button
          onClick={() => handleSave(newsThumbnail, unsavedChangesExist)}
          className="z-10 w-56"
          disabled={!unsavedChangesExist}
        >
          {translate('Save', lang)}
        </Button>
      </div>
    </div>
  )
}
