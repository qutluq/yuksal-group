'use client'
import 'react-toastify/dist/ReactToastify.css'

import Image from 'next/image'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'

import { Button } from '@/components/button'
import { LoadingLogo } from '@/components/fallback'
import { ModalDialog } from '@/components/modal'
import { TextEditor } from '@/components/quill-editor'
import { UploadImageDialog } from '@/components/upload'
import { usePost } from '@/hooks/usePost'
import { usePostUnsavedChanges } from '@/hooks/usePostUnsavedChanges'
import { MainLayout } from '@/layouts/main'
import { formatDateJS, translate } from '@/utils'
import { DEFAULT_AUTHOR_IMG } from '@/utils/settings'

import type { ImageFile } from '@/types'
import type { CSSProperties } from 'react'
type PropTypes = {
  slug: string
  lang: string
}

export const PostAdmin = ({ slug, lang }: PropTypes) => {
  const { state: postState } = usePost(slug, lang)
  const { modal, setModal } = usePostUnsavedChanges(
    postState.unsavedChangesExist,
    lang,
  )
  const [modalChooseClosed, setModalChooseClosed] = useState(true)

  const handleClickSave = () => {
    postState.setPost((state) => ({
      ...state!,
      content: postState.content,
      title: postState.title,
      readingTime: postState.readingTime,
      publishedAt: postState.publishedAt,
      featuredImage: postState?.featuredImage?.id,
    }))
    postState.setUpdateDB(true)
  }

  const handleClickPublish = () => {
    postState.setPost((state) => ({
      ...state!,
      content: postState.content,
      title: postState.title,
      readingTime: postState.readingTime,
      publishedAt: postState.publishedAt,
      featuredImage: postState?.featuredImage?.id,
      published: !postState.published, //if published then unpublish
    }))
    postState.setUpdateDB(true)
  }

  const handleTitleChange = (e) => {
    postState.setTitle(e.target.value)
    postState.setUnsavedChangesExist(true)
  }

  const handleReadingTimeChange = (e) => {
    postState.setReadingTime(Number(e.target.value))
    postState.setUnsavedChangesExist(true)
  }
  const handlePublishedDateChange = (e) => {
    postState.setPublishedAt(new Date(e.target.value))
    postState.setUnsavedChangesExist(true)
  }
  const handleContentChange = (val) => {
    postState.setContent(val)
    postState.setUnsavedChangesExist(true)
  }
  const handleSetImage = (img: ImageFile) => {
    if (img) {
      postState.setFeaturedImage(img)
      postState.setUnsavedChangesExist(true)
    }
  }

  const handleChooseClose = (closed: boolean) => {
    setModalChooseClosed(closed)
  }

  if (postState.loading) {
    return <LoadingLogo />
  }

  if (!postState.post) {
    return (
      <div className="text-xl text-[var(--color-text-primary)]">
        {translate('Post does not exist.', lang)}
      </div>
    )
  }

  if (postState.updateDB) {
    return
  }

  return (
    <MainLayout
      page="blog"
      lang={lang}
      bgImg={postState?.featuredImage?.id || ''}
      mode={'admin'}
    >
      {postState.updateDB && (
        <div className="fixed z-20 h-screen w-screen opacity-30">
          <LoadingLogo />
        </div>
      )}
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
      {!modalChooseClosed && (
        <UploadImageDialog
          lang={lang}
          handleSetImage={handleSetImage}
          handleClose={handleChooseClose}
          currentImage={postState.featuredImage}
        />
      )}
      <div className="flex min-h-[700px] w-full flex-col items-center justify-start gap-7 bg-[var(--color-secondary)]">
        <div className="flex flex-row items-center gap-3">
          <span>{translate('Featured image', lang)} :</span>
          <div className="w-52 truncate">
            {postState?.featuredImage?.id || translate('No file chosen', lang)}
          </div>
          <Button
            onClick={() => setModalChooseClosed(false)}
            title={translate('Choose file', lang)}
          ></Button>
        </div>
        <article className="flex w-5/6 flex-col gap-7 text-[var(--color-text-primary)] md:w-3/4 lg:w-2/3">
          <div className="mx-auto flex w-fit flex-col items-start">
            <div className="flex w-fit flex-row justify-center py-3 text-2xl md:text-3xl">
              <input
                value={postState.title}
                onChange={handleTitleChange}
                className="min-w-[400px] grow rounded-sm bg-white text-black"
                type="text"
                autoFocus
                placeholder={translate('Title', lang)}
              />
            </div>
            <div className="flex w-auto flex-row items-center justify-center gap-3">
              <Image
                src={DEFAULT_AUTHOR_IMG}
                alt=""
                className="rounded-full object-cover"
                width={70}
                height={70}
              />

              <div className="flex flex-col gap-1 tracking-tight text-[var(--color-text-secondary)]">
                <p className="text-[var(--color-text-primary)]">
                  {postState.author?.name}
                </p>
                <div className="flex flex-row gap-1 text-sm">
                  <div className="flex flex-row gap-1">
                    <input
                      value={postState.readingTime}
                      onChange={handleReadingTimeChange}
                      className="w-[50px] grow rounded-sm bg-white text-black"
                      type="number"
                    />
                    <p>{translate('min read', lang)}</p>
                  </div>
                  &#183;
                  <div style={{ colorScheme: 'only light' } as CSSProperties}>
                    <input
                      value={formatDateJS(
                        postState.publishedAt
                          ? new Date(postState.publishedAt)
                          : null,
                      )}
                      onChange={handlePublishedDateChange}
                      className="w-[120px] grow rounded-sm text-black"
                      type="date"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="whitespace-pre-wrap bg-gray-300 text-base text-gray-700">
            <TextEditor
              forwardedRef={postState.quillRef}
              value={postState.content}
              onChange={handleContentChange}
            />
          </div>
        </article>
        <div className="flex flex-row gap-3">
          <Button onClick={handleClickSave} className="w-40">
            {translate('Save', lang)}
          </Button>
          <Button onClick={handleClickPublish} className="w-40">
            {postState.published
              ? translate('Unpublish', lang)
              : translate('Publish', lang)}
          </Button>
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </MainLayout>
  )
}
