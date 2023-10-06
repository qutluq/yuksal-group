'use client'
import type { ImageFile } from '@/types'

import { UploadImageDialog } from '../upload'

type PropTypes = {
  lang: string
  image: ImageFile | undefined
  setImage: (ImageFile) => void
  uploadModalClosed: boolean
  setUploadModalClosed: (boolean) => void
  setUnsavedChangesExist: (boolean) => void
}

export const ImageUploadDialog = ({
  lang,
  image,
  setImage,
  uploadModalClosed,
  setUploadModalClosed,
  setUnsavedChangesExist,
}: PropTypes) => {
  if (uploadModalClosed) {
    return null
  }

  const handleSetImage = (img: ImageFile) => {
    if (img) {
      setImage(img)
      setUnsavedChangesExist(true)
    }
  }

  const handleChooseClose = (closed: boolean) => {
    setUploadModalClosed(closed)
  }

  return (
    <UploadImageDialog
      lang={lang}
      handleSetImage={handleSetImage}
      handleClose={handleChooseClose}
      currentImage={image}
    />
  )
}
