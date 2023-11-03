'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { AiTwotoneDelete } from 'react-icons/ai'
import { FiEdit, FiPlusCircle } from 'react-icons/fi'

import { formatDate, translate } from '@/utils'
import {
  deleteGalleryImageClientSide,
  getGalleryImagesInitialized,
} from '@/utils/api-client'

import { ModalDialog } from '../modal'

import type { GalleryImageInitialized, Modal } from '@/types'
type PropTypes = {
  lang: string
}

export const GalleryEdit = ({ lang }: PropTypes) => {
  const [images, setImages] = useState<GalleryImageInitialized[]>()
  const [deleteId, setDeleteId] = useState(-1)
  const [modal, setModal] = useState<Modal>({
    approved: false,
    closed: true,
    title: '',
  })

  useEffect(() => {
    getGalleryImagesInitialized()
      .then((response) => {
        setImages(response)
      })
      .catch((error) => {
        console.error(`Fetch failed: ${error}`)
      })
  }, [])

  useEffect(() => {
    if (modal?.closed && modal.approved) {
      deleteGalleryImageClientSide(deleteId)
        .then((response) => {
          if (!response.ok || response.status < 200 || response.status > 299) {
            console.error(`Can not delete images`)
            alert(translate('Failed to delete image', lang))
            return
          }
          const filteredImgs = images
            ? [...images.filter((img) => img.id !== deleteId)]
            : []

          setImages(() => [...filteredImgs])
        })
        .finally(() => {
          setDeleteId(-1)
          setModal((state) => ({ ...state, approved: false }))
        })
    }
  }, [modal])

  const handleDeleteImage = useCallback(async (id: number, title: string) => {
    setDeleteId(id)
    setModal((state) => ({
      ...state,
      title: title,
      closed: false,
      approved: false,
    }))
  }, [])

  if (!images) {
    return <div>Loading...</div>
  }

  return (
    <div className="mx-auto grid w-fit grid-cols-1 gap-20 py-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
      {images.map((img) => (
        <div
          key={img.id}
          className="relative flex h-[500px]  w-80 flex-col items-center justify-center"
        >
          <div className="relative h-[50%] w-full overflow-hidden bg-gray-700">
            {img.image.href !== '' && (
              <Image
                src={img.image.href}
                alt={img.title}
                className="object-cover"
                fill
              />
            )}
          </div>
          <span className="absolute top-0 flex h-full items-center justify-center">
            <span className="flex h-10 items-center justify-center rounded-3xl bg-[var(--color-primary)] p-3 text-sm md:p-3 lg:p-5 lg:text-base">
              {formatDate(img.date ? new Date(img.date) : null)}
            </span>
          </span>
          <div className="flex h-[50%] w-full flex-col items-center justify-center gap-6 bg-white text-[var(--color-secondary)]">
            <span className="w-64 text-center font-bold uppercase">
              {img.title}
            </span>
          </div>
          <div className="absolute right-3 top-3 z-10 flex flex-row gap-3">
            <Link
              href={{
                pathname: '/admin/gallery-image',
                query: {
                  id: img.id.toString(),
                },
              }}
            >
              <FiEdit className="h-10 w-10 overflow-hidden text-white" />
            </Link>
            <AiTwotoneDelete
              className="h-10 w-10 cursor-pointer"
              onClick={() => handleDeleteImage(img.id, img.title)}
            />
          </div>
        </div>
      ))}
      <div className="relative flex h-[500px]  w-80 flex-col items-center justify-center">
        <div className="h-[50%] w-full bg-gray-700"></div>

        <Link
          className="absolute top-0 flex h-full items-center justify-center"
          href={{
            pathname: '/admin/gallery-image',
          }}
        >
          <FiPlusCircle className="z-10 h-20 w-20 overflow-hidden rounded-full bg-[var(--color-primary)]" />
        </Link>

        <div className="flex h-[50%] w-full  bg-white text-[var(--color-secondary)]" />
      </div>
      {!modal.closed && (
        <ModalDialog
          title={translate('Delete gallery image', lang)}
          body={
            <div className="flex flex-col items-center">
              {translate('Are you sure you want to delete the image', lang)}
              {<p className="font-bold"> {modal.title}?</p>}
            </div>
          }
          btnTitleAgree="Yes"
          btnTitleCancel="Cancel"
          onClose={(response) => {
            setModal((state) => ({
              ...state,
              approved: response,
              closed: true,
            }))
          }}
        />
      )}
    </div>
  )
}
