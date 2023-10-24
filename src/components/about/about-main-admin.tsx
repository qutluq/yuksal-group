'use client'
import '@/components/quill-editor/quill.snow.custom.css'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/button'
import { ImageInput, ImageUploadDialog } from '@/components/image'
import { TextEditor } from '@/components/quill-editor'
import { translate } from '@/utils'
import {
  getAboutMainInitialized,
  revalidateImageCache,
  updateAboutMainClientSide,
} from '@/utils/api-client'

import type ReactQuill from 'react-quill'

import type { AboutMainInitialized, UploadModal } from '@/types'
type PropTypes = {
  lang: string
}

export const AboutMainEdit = ({ lang }: PropTypes) => {
  const router = useRouter()
  const [aboutMain, setAboutMain] = useState<AboutMainInitialized>({
    id: -1,
    title: '',
    content: '',
    image: { file: null, href: '', id: '' },
    language: lang,
  })

  const [isLoading, setIsLoading] = useState(true)

  const [uploadModal, setUploadModal] = useState<UploadModal>({
    closed: true,
    file: undefined,
  })
  const [unsavedChangesExist, setUnsavedChangesExist] = useState(false)
  const quillRef = useRef<ReactQuill>(null)

  //workaround for text-editor changing on initial load, do not register unsaved change for initial load
  const [textChanged, setTextChanged] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getAboutMainInitialized(lang).then((response) => {
      setAboutMain(response)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {}, [aboutMain.content])

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current?.editor?.root.setAttribute('spellcheck', 'false')
    }
  }, [quillRef.current])

  useEffect(() => {
    if (uploadModal.closed) return
    //new image was set in upload dialog
    if (aboutMain?.image?.id !== uploadModal.file?.id) {
      setAboutMain((state) => ({
        ...state,
        image: { ...uploadModal.file! },
      }))
    }
  }, [uploadModal])

  const handleClickSave = () => {
    if (!unsavedChangesExist) return

    updateAboutMainClientSide({
      ...aboutMain,
      image: aboutMain.image.id,
      language: lang,
    })
      .then(async (response) => {
        if (!response.ok || response.status < 200 || response.status > 299) {
          console.error(`Can not update about main`)
          alert(translate('About main info can not be saved!', lang))
          return
        }
        setUnsavedChangesExist(false)
        try {
          await revalidateImageCache()
        } catch (error) {
          console.error(`Cache revalidation failed: ${error}`)
          return
        }
        alert(translate('About main info saved', lang))
        router.push('/admin/home')
      })
      .catch((error) => {
        console.error(`Can not update about main info: ${error}`)
        alert(translate('About main info can not be saved!', lang))
      })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center text-[var(--color-text-primary)]">
      <div className=" w-full px-10 text-justify text-base sm:w-[600px] sm:px-0 lg:w-[900px] xl:w-[1200px] ">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="flex w-full flex-col items-center justify-center overflow-hidden lg:w-[400px] lg:items-start xl:w-[600px]">
            <div className="relative flex w-full flex-col items-center justify-center pb-10 lg:items-start">
              <span className="text-7xl font-bold text-white/10 sm:text-9xl">
                GROUP
              </span>
              <span className="absolute pl-3 text-4xl sm:text-6xl">YUKSAL</span>
            </div>

            <div className="flex flex-row items-center gap-3 pb-10 lg:mx-0">
              <div className="h-1 w-20 bg-[var(--color-primary)]" />
              <div className="text-center text-lg uppercase sm:text-2xl">
                <input
                  value={aboutMain.title}
                  onChange={(e) => {
                    setAboutMain((state) => ({
                      ...state,
                      title: e.target.value,
                    }))
                    setUnsavedChangesExist(true)
                  }}
                  className="min-w-[300px] grow rounded-sm bg-white text-black"
                  type="text"
                  placeholder={translate('Title', lang)}
                />
              </div>
              <div className="h-1 w-20 bg-[var(--color-primary)] lg:hidden" />
            </div>
          </div>

          {aboutMain.image && (
            <div className="flex w-full flex-row items-center justify-center lg:w-[500px] xl:w-[600px]">
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
        </div>
        <div className="whitespace-pre-wrap text-base" autoFocus={false}>
          <TextEditor
            forwardedRef={quillRef}
            value={aboutMain.content}
            onChange={(txt: string) => {
              if (!textChanged) {
                setTextChanged(true)
              } else {
                setUnsavedChangesExist(true)
              }
              setAboutMain((state) => ({ ...state, content: txt }))
            }}
          />
        </div>
        <Button
          onClick={handleClickSave}
          className="w-40"
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
    </div>
  )
}
