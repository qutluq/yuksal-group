'use client'
import type { ImageFile, UploadModal } from '@/types'

import { UploadImageDialog } from '../upload'

type PropTypes = {
  lang: string
  uploadModal: UploadModal
  setUploadModal: (boolean) => void
  setUnsavedChangesExist: (boolean) => void
}

export const ImageUploadDialog = ({
  lang,
  uploadModal,
  setUploadModal,
  setUnsavedChangesExist,
}: PropTypes) => {
  if (uploadModal.closed) {
    return null
  }

  const handleSetImage = (img: ImageFile) => {
    if (img) {
      setUploadModal((state) => ({ ...state, file: img }))
      setUnsavedChangesExist(true)
    }
  }

  const handleChooseClose = (closed: boolean) => {
    setUploadModal((state) => ({ ...state, closed: closed }))
  }

  return (
    <UploadImageDialog
      lang={lang}
      handleSetImage={handleSetImage}
      handleClose={handleChooseClose}
      currentImage={uploadModal.file}
    />
  )
}
