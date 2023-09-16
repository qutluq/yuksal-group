'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/button'
import { useServerImages } from '@/hooks/useServerImages'
import { useTimeout } from '@/hooks/useTimeout'
import type { ImageFile } from '@/types'
import { classNames, translate } from '@/utils'

import { ChosenImage } from './chosen-image'
import { ImageList } from './image-list'
import { UploadImageButton } from './upload-image-button'
type PropTypes = {
  lang: string
  handleSetImage: (string) => void
  handleClose: (boolean) => void
  currentImage: ImageFile | undefined
}

export const UploadImageDialog = ({
  lang,
  handleSetImage,
  handleClose,
  currentImage,
}: PropTypes) => {
  const [chosenImage, setChosenImage] = useState<ImageFile>()
  const { images, setImages, updateImage } = useServerImages()
  const [duplicateName, setDuplicateName] = useState('')
  const [animateUploadBtn, setAnimateUploadBtn] = useState(false)

  useEffect(() => {
    if (currentImage) {
      setChosenImage(currentImage)
    }
  }, [currentImage])

  useTimeout(animateUploadBtn, () => setAnimateUploadBtn(false), 1000)

  return (
    <div
      className="fixed left-0 top-0 z-20 flex h-screen w-screen flex-col items-center justify-center bg-black/30"
      onClick={() => handleClose(true)}
    >
      <div
        className="flex h-[700px] w-11/12 flex-col items-center justify-start gap-5 rounded-md border-2 border-white bg-gray-300"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="z-30 flex flex-row gap-3 p-3">
          <ChosenImage
            chosenImage={chosenImage}
            images={images}
            lang={lang}
            setChosenImage={setChosenImage}
            setDuplicateName={setDuplicateName}
          />
          <div className="flex h-full flex-col gap-3">
            <Button
              onClick={() => {
                if (!chosenImage?.id) {
                  alert(translate('Image need to be uploaded first!', lang))
                  setAnimateUploadBtn(true)
                  return
                }
                handleSetImage(chosenImage)
              }}
              className="h-fit w-40"
            >
              {translate('Set', lang)}
            </Button>

            <div
              className={classNames(
                animateUploadBtn && 'animate-[wiggle_1.5s]',
              )}
            >
              <UploadImageButton
                chosenImage={chosenImage}
                duplicateName={duplicateName}
                setChosenImage={setChosenImage}
                updateImage={updateImage}
                lang={lang}
              />
            </div>
            <Button onClick={handleClose} className="h-fit w-40">
              {translate('Close', lang)}
            </Button>
          </div>
        </div>

        <ImageList
          duplicateName={duplicateName}
          setImages={setImages}
          chosenImage={chosenImage}
          lang={lang}
          images={images}
          setChosenImage={setChosenImage}
        />
      </div>
    </div>
  )
}
