import type { Dispatch, SetStateAction } from 'react'
import { useEffect } from 'react'

import { Button } from '@/components/button'
import { ModalDialog } from '@/components/modal'
import { useModal } from '@/hooks/useModal'
import type { ImageFile } from '@/types'
import { translate } from '@/utils'
import { revalidateImageCache, uploadImageClientSide } from '@/utils/api-client'
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
  const { modalClosed, setModalClosed, confirmed, setConfirmed } = useModal()

  useEffect(() => {
    if (modalClosed && confirmed) {
      uploadImage()
    }
  }, [confirmed])

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
      setModalClosed(false)
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
      {!modalClosed && (
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
          setConfirmed={setConfirmed}
          setModalClosed={setModalClosed}
        />
      )}
    </>
  )
}
