import Image from 'next/image'
import { useEffect, useState } from 'react'
import { TfiClose } from 'react-icons/tfi'

import { ModalDialog } from '@/components/modal'
import { Tooltip } from '@/components/tooltip'
import { classNames, translate } from '@/utils'
import { deleteImageClientSide } from '@/utils/api-client'

import type { ImageFile, Modal } from '@/types'
import type { Dispatch, SetStateAction } from 'react'
type PropTypes = {
  images: { string: string } | object
  duplicateName: string
  chosenImage: ImageFile | undefined
  lang: string
  setImages: Dispatch<SetStateAction<object | { string: string }>>
  setChosenImage: Dispatch<SetStateAction<ImageFile | undefined>>
}

export const ImageList = ({
  images,
  duplicateName,
  chosenImage,
  lang,
  setImages,
  setChosenImage,
}: PropTypes) => {
  const [modal, setModal] = useState<Modal>({
    approved: false,
    closed: true,
    title: '',
  })

  const [removeImage, setRemoveImage] = useState('')

  useEffect(() => {
    if (modal?.closed && modal.approved) {
      deleteImage()
      setModal((state) => ({ ...state, approved: false }))
    }
  }, [modal])

  const deleteImage = () => {
    if (!removeImage) {
      return
    }

    deleteImageClientSide(removeImage)
      .then(async (response) => {
        if (response.ok || (response.status > 199 && response.status < 300)) {
          alert(translate('Image was deleted successfully!!', lang))

          //update images hook
          const updatedImages = { ...images }
          delete updatedImages[removeImage]
          setImages(updatedImages)

          if (chosenImage?.id === removeImage) {
            setChosenImage({ href: '', id: '', file: null })
          }

          return
        }

        alert(translate('Image delete failed!!', lang))
      })
      .catch((error) => {
        alert(translate('Image delete failed!!', lang))
        console.error(`Image delete failed: ${error}`)
      })
      .finally(() => {
        setRemoveImage('')
      })
  }

  const handleRemoveClick = (filename: string) => {
    setRemoveImage(filename)
    setModal((state) => ({ ...state, closed: false }))
  }

  return (
    <>
      <div className="relative grid h-80 w-auto grid-cols-4 gap-2 overflow-scroll bg-black/30 p-3 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
        {Object.keys(images).map((imageKey) => (
          <div
            key={imageKey}
            className={classNames(
              'relative z-10 h-32 w-32 bg-gray-700',
              duplicateName &&
                imageKey === duplicateName &&
                'animate-[wiggle_1.0s]',
            )}
            onClick={(e) => {
              e.stopPropagation()
              setChosenImage({
                id: imageKey,
                href: images[imageKey],
                file: null,
              })
            }}
          >
            {images[imageKey] && (
              <>
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveClick(imageKey)
                  }}
                  className="absolute right-0 top-0 z-20 cursor-pointer rounded-full bg-red-300 p-1 hover:bg-red-500"
                >
                  <TfiClose className="text-black" />
                </div>
                <Tooltip text={imageKey}>
                  <Image
                    src={images[imageKey]}
                    alt={imageKey}
                    className="rounded-sm object-contain"
                    fill
                  />
                </Tooltip>
              </>
            )}
          </div>
        ))}
      </div>

      {!modal.closed && removeImage && (
        <ModalDialog
          title={translate('Remove image', lang)}
          body={
            <div className="flex flex-col items-center">
              {`${translate(
                'Are you sure you want to delete image:',
                lang,
              )} ${removeImage}`}
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
