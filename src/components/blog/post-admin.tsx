'use client'
import 'react-toastify/dist/ReactToastify.css'

import Image from 'next/image'
import type { CSSProperties } from 'react'
import { toast, ToastContainer } from 'react-toastify'

import { Button } from '@/components/button'
import { LoadingLogo } from '@/components/fallback'
import { ModalDialog } from '@/components/modal'
import { TextEditor } from '@/components/quill-editor'
import { usePost } from '@/hooks/usePost'
import { usePostUnsavedChanges } from '@/hooks/usePostUnsavedChanges'
import { MainLayout } from '@/layouts/main'
import { formatDateJS, translate } from '@/utils'
import { DEFAULT_AUTHOR_IMG } from '@/utils/settings'
type PropTypes = {
  slug: string
  lang: string
}

export const PostAdmin = ({ slug, lang }: PropTypes) => {
  const { state: postState } = usePost(slug, lang)
  const { modalClosed, setModalClosed, setConfirmed } = usePostUnsavedChanges(
    postState.unsavedChangesExist,
    lang,
  )

  const handleClickSave = () => {
    postState.setPost((state) => ({
      ...state!,
      content: postState.content,
      title: postState.title,
      readingTime: postState.readingTime,
      publishedAt: postState.publishedAt,
      featuredImage: postState.featuredImage,
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
      featuredImage: postState.featuredImage,
      published: !postState.published, //if published then unpublish
    }))
    postState.setUpdateDB(true)
  }

  const handleFeaturedImageUpload = () => {
    if (!postState.featuredImageFile) {
      toast.info(translate('No image chosen', lang))
      return
    }

    try {
      const imageData = new FormData()
      imageData.set('image', postState.featuredImageFile)

      fetch('/api/upload/image', {
        method: 'POST',
        body: imageData,
      }).then(async (response) => {
        if (!response.ok || response.status > 600) {
          const { message } = await response.json()
          console.error(`Can not upload image: ${message}`)
          toast.error(translate('Image upload failed!', lang))
          return
        }
        const { imagePath } = await response.json()
        postState.setFeaturedImage(imagePath)
        postState.setUnsavedChangesExist(true)
        toast.success(translate('Image uploaded successfully!', lang))
      })
    } catch (error) {
      console.error(error)
      toast.error(translate('Image upload failed!', lang))
    }
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
  const handleFeaturedChange = (e) => {
    const img = e.target.files?.[0]
    if (img) {
      postState.setFeaturedImageFile(img)
      postState.setFeaturedImage(URL.createObjectURL(img))
      postState.setUnsavedChangesExist(true)
    }
  }

  if (postState.loading) {
    return <div>Loading...</div>
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
    <MainLayout page="blog" lang={lang} bgImg={postState.featuredImage}>
      {postState.updateDB && (
        <div className="fixed z-20 h-screen w-screen opacity-30">
          <LoadingLogo />
        </div>
      )}
      {!modalClosed && (
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
          setConfirmed={setConfirmed}
          setModalClosed={setModalClosed}
        />
      )}
      <div className="flex min-h-[700px] w-full flex-col items-center justify-start gap-7 bg-[var(--color-secondary)]">
        <div className="flex flex-row gap-3">
          <label htmlFor="featured_image">
            {translate('Featured image', lang)} :
          </label>
          <input
            type="file"
            id="featured_image"
            name="featured_image"
            onChange={handleFeaturedChange}
          />
          <Button onClick={handleFeaturedImageUpload}>
            {translate('Upload', lang)}
          </Button>
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
                  <div
                    style={{ 'color-scheme': 'only light' } as CSSProperties}
                  >
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
