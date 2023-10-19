'use client'
import './styles.css'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { AiTwotoneDelete } from 'react-icons/ai'
import { FiEdit, FiPlusCircle } from 'react-icons/fi'

import { formatDate, translate } from '@/utils'
import { deleteNewsThumbnailClientSide } from '@/utils/api-client'

import { ModalDialog } from '../modal'

import type { Modal, NewsThumbnailInitialized, UserMode } from '@/types'
type PropTypes = {
  lang: string
  mode: UserMode
  newsThumbnails: NewsThumbnailInitialized[]
}

type Thumbnails = NewsThumbnailInitialized & {
  isNew: boolean
}

export const NewsSectionHome = ({ lang, mode, newsThumbnails }: PropTypes) => {
  const [thumbnails, setThumbnails] = useState<Thumbnails[]>([])
  const [deleteId, setDeleteId] = useState(-1)
  const [modal, setModal] = useState<Modal>({
    approved: false,
    closed: true,
    title: '',
  })

  useEffect(() => {
    if (!newsThumbnails) {
      return
    }
    setThumbnails(() => [
      ...newsThumbnails.map((thumb) => ({ ...thumb, isNew: false })),
    ])
  }, [newsThumbnails])

  useEffect(() => {
    if (modal?.closed && modal.approved) {
      deleteNewsThumbnailClientSide(deleteId)
        .then((response) => {
          if (!response.ok || response.status < 200 || response.status > 299) {
            console.error(`Can not delete news thumbnail`)
            alert(translate('Failed to delete news thumbnail', lang))
            return
          }
          const thumbs = [
            ...thumbnails.filter((thumbnail) => thumbnail.id !== deleteId),
          ]

          setThumbnails(() => [...thumbs])
        })
        .finally(() => {
          setDeleteId(-1)
          setModal((state) => ({ ...state, approved: false }))
        })
    }
  }, [modal])

  const addNewItem = useCallback((thumbnails) => {
    const idArray = thumbnails.map((item) => item.id)
    const greatestId = idArray.length !== 0 ? Math.max(...idArray) : 0

    const thumbs = [...thumbnails]
    const newItem = {
      id: greatestId + 1,
      title: '',
      date: new Date(0),
      image: { id: '', href: '', file: null },
      url: '',
      isNew: true,
    }

    thumbs.push(newItem)
    setThumbnails(() => [...thumbs])
  }, [])

  const handleDeleteThumbnail = useCallback(
    async (id: number, title: string) => {
      setDeleteId(id)
      setModal((state) => ({
        ...state,
        title: title,
        closed: false,
        approved: false,
      }))
    },
    [],
  )

  if (!thumbnails) {
    return null
  }

  return (
    <div className="py-10">
      <div className="text-center text-sm uppercase md:text-3xl">
        {translate('Latest news', lang)}
      </div>
      <div className="mx-auto grid w-fit grid-cols-1 gap-20 py-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
        {thumbnails.map((thumb) => (
          <div
            key={thumb.id}
            className="news-section relative flex h-[500px]  w-80 flex-col items-center justify-center"
          >
            <div className="relative h-[50%] w-full overflow-hidden bg-gray-700">
              {thumb.image?.href !== '' && (
                <Image
                  src={thumb.image?.href}
                  alt="News thumbnail image"
                  className="object-cover"
                  fill
                />
              )}
            </div>
            <span className="absolute top-0 flex h-full items-center justify-center">
              <span className="flex h-10 items-center justify-center rounded-3xl bg-[var(--color-primary)] p-3 text-sm md:p-3 lg:p-5 lg:text-base">
                {formatDate(thumb.date ? new Date(thumb.date) : null)}
              </span>
            </span>
            <div className="flex h-[50%] w-full flex-col items-center justify-center gap-6 bg-white text-[var(--color-secondary)]">
              <span className="w-64 text-center font-bold uppercase">
                {thumb.title}
              </span>
              <span className="h-[1px] w-[145px] bg-black/10" />
              <Link
                href={thumb.url}
                className="z-10 flex w-fit flex-col items-center justify-center gap-[2px] rounded-full border border-white bg-white/10 text-sm uppercase after:block after:h-[1px] after:w-full after:bg-[var(--color-secondary)] after:content-[''] hover:text-[var(--color-primary)]"
              >
                {translate('read more', lang)}
              </Link>
            </div>
            {mode === 'admin' && (
              <div className="absolute right-3 top-3 z-10 flex flex-row gap-3">
                <Link
                  href={{
                    pathname: '/admin/home-news',
                    query: {
                      id: thumb.id.toString(),
                      isnew: thumb?.isNew ? '1' : '0',
                    },
                  }}
                >
                  <FiEdit className="h-10 w-10 overflow-hidden text-white" />
                </Link>
                <AiTwotoneDelete
                  className="h-10 w-10 cursor-pointer"
                  onClick={() => handleDeleteThumbnail(thumb.id, thumb.title)}
                />
              </div>
            )}
          </div>
        ))}
        {mode === 'admin' && (
          <div className="news-section relative flex h-[500px]  w-80 flex-col items-center justify-center">
            <div className="h-[50%] w-full bg-gray-700"></div>

            <span
              className="absolute top-0 flex h-full items-center justify-center"
              onClick={() => addNewItem(thumbnails)}
            >
              <FiPlusCircle className="z-10 h-20 w-20 overflow-hidden rounded-full bg-[var(--color-primary)]" />
            </span>

            <div className="flex h-[50%] w-full  bg-white text-[var(--color-secondary)]" />
          </div>
        )}
      </div>
      {!modal.closed && (
        <ModalDialog
          title={translate('Delete thumbnail', lang)}
          body={
            <div className="flex flex-col items-center">
              {translate('Are you sure you want to delete the thumbnail', lang)}
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
