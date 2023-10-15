import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/button'
import { ModalDialog } from '@/components/modal'
import { translate } from '@/utils'
import { revalidateImageCache, uploadImageClientSide } from '@/utils/api-client'

import type { ImageFile, Modal } from '@/types'
type PropTypes = {
  chosenImage: ImageFile | undefined
  duplicateName: string
  lang: string
  updateImage: (f: string, href: string) => void
  setChosenImage: Dispatch<SetStateAction<ImageFile | undefined>>
}

export const UploadImageButton = ({
  chosenImage,
  duplicateName,
  setChosenImage,
  updateImage,
  lang,
}: PropTypes) => {
  const [modal, setModal] = useState<Modal>({
    approved: false,
    closed: true,
    title: '',
  })

  useEffect(() => {
    if (modal.closed && modal.approved) {
      uploadImage()
    }
  }, [modal])

  const uploadImage = () => {
    if (!chosenImage?.file) {
      return
    }
    uploadImageClientSide(chosenImage?.file)
      .then((response) => {
        if (response.ok || (response.status > 199 && response.status < 300)) {
          if (duplicateName) {
            revalidateImageCache() //revalidate image cache if duplicate filename was uploaded
          }

          const filename = chosenImage.file!.name
          setChosenImage((state) => ({ ...state!, id: filename }))
          updateImage(filename, chosenImage?.href)
          alert(translate('Image uploaded successfully!!', lang))
          return
        }
        alert(translate('Image upload failed!!', lang))
      })
      .catch((error) => {
        alert(translate('Image upload failed!!', lang))
        console.error(`Image upload failed: ${error}`)
      })
  }

  const handleImageUpload = () => {
    if (!chosenImage?.file) {
      alert(translate('No file chosen for upload!', lang))
      return
    }

    if (duplicateName) {
      //image with duplicate name is going to be uploaded and rewrite the original image
      //ask the user if he/she really wants it
      setModal((state) => ({ ...state, closed: false }))
    } else {
      uploadImage()
    }
  }

  return (
    <>
      <Button
        onClick={handleImageUpload}
        className="h-fit w-40"
        disabled={!chosenImage || chosenImage?.id !== '' || !chosenImage.href}
      >
        {translate('Upload', lang)}
      </Button>
      {!modal.closed && (
        <ModalDialog
          title={translate('Upload duplicate image', lang)}
          body={
            <div className="flex flex-col items-center">
              {translate(
                'Are you sure you want to rewrite the original image with same name?',
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
    </>
  )
}
