'use client'
import { useEffect, useState } from 'react'

import { SanitizedHTML } from '@/components/html'
import { ImageInput, ImageUploadDialog } from '@/components/image'
import { getAboutMainInitialized } from '@/utils/api-client'

import type { AboutMainInitialized, UploadModal } from '@/types'
type PropTypes = {
  lang: string
}

export const AboutMainEdit = ({ lang }: PropTypes) => {
  const [aboutMain, setAboutMain] = useState<AboutMainInitialized>()
  const [uploadModal, setUploadModal] = useState<UploadModal>({
    closed: true,
    file: undefined,
  })
  const [unsavedChangesExist, setUnsavedChangesExist] = useState(false)

  useEffect(() => {
    getAboutMainInitialized(lang).then((response) => {
      setAboutMain(response)
    })
  }, [])

  useEffect(() => {
    if (uploadModal.closed) return
    //new image was set in upload dialog
    if (aboutMain?.image?.id !== uploadModal.file?.id) {
      setAboutMain((state) => ({
        ...state!,
        image: { ...uploadModal.file! },
      }))
    }
  }, [uploadModal])

  if (!aboutMain) {
    return <div>Loading...</div>
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center text-[var(--color-text-primary)]">
      <div className=" w-full px-10 text-justify text-base sm:w-[600px] sm:px-0 lg:w-[900px] xl:w-[1200px] ">
        <div className="flex w-full flex-col items-center justify-center overflow-hidden lg:float-left lg:w-[400px] lg:items-start xl:w-[600px]">
          <div className="relative flex w-full flex-col items-center justify-center pb-10 lg:items-start">
            <span className="text-7xl font-bold text-white/10 sm:text-9xl">
              GROUP
            </span>
            <span className="absolute pl-3 text-4xl sm:text-6xl">YUKSAL</span>
          </div>

          <div className="flex flex-row items-center gap-3 pb-10 lg:mx-0">
            <div className="h-1 w-20 bg-[var(--color-primary)]" />
            <div className="text-center text-lg uppercase sm:text-2xl">
              {aboutMain.title}
            </div>
            <div className="h-1 w-20 bg-[var(--color-primary)] lg:hidden" />
          </div>
        </div>

        {aboutMain.image && (
          <div className="flex w-full flex-row items-center justify-center lg:float-right lg:w-[500px] xl:w-[600px]">
            <div className="relative top-0 mb-5 h-[300px] w-[300px] overflow-hidden rounded-md sm:h-[460px] sm:w-[460px] lg:ml-5 xl:h-[580px] xl:w-[580px]">
              <ImageInput
                file={aboutMain.image}
                handleOnClick={() => {
                  setUploadModal((state) => ({
                    ...state,
                    file: aboutMain.image,
                    closed: false,
                  }))

                  setUnsavedChangesExist(true)
                }}
                size={'cover'}
              />
            </div>
          </div>
        )}
        <div
          className="whitespace-pre-wrap text-base text-[var(--color-text-primary)]"
          id="content"
        >
          <SanitizedHTML html={aboutMain.content} />
        </div>
      </div>
      <ImageUploadDialog
        uploadModal={uploadModal}
        setUploadModal={setUploadModal}
        setUnsavedChangesExist={setUnsavedChangesExist}
        lang={lang}
      />
    </div>
  )
}
