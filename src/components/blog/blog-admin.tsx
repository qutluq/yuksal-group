'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsClock } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'

import { Button } from '@/components/button'
import { LoadingBlog } from '@/components/fallback'
import { PosterBlog } from '@/components/image'
import { ModalDialog } from '@/components/modal'
import { PaginationClientSide } from '@/components/pagination/pagination-client-side'
import { usePaginatedPostsClientSide } from '@/hooks/usePaginatedPostsClientSide'
import { classNames, formatDate, translate } from '@/utils'
import { deletePostClientSide } from '@/utils/api-client'

import type { Modal } from '@/types'
type PropTypes = {
  lang: string
}

export const BlogAdmin = ({ lang }: PropTypes) => {
  const {
    loading,
    page,
    setPage,
    posts,
    totalPosts,
    setUpdate,
    paginationLimit,
    imageUrls,
  } = usePaginatedPostsClientSide()

  const [modal, setModal] = useState<Modal>({
    approved: false,
    closed: true,
    title: '',
  })
  const [deleteId, setDeleteId] = useState(-1)

  useEffect(() => {
    if (modal?.closed && modal.approved) {
      deletePostClientSide(deleteId).then((response) => {
        if (response.ok) {
          setUpdate(true)
          setModal((state) => ({ ...state, approved: false }))
        }
      })
      setDeleteId(-1)
    }
  }, [modal])

  const handleClickDelete = async (id: number, title: string) => {
    setDeleteId(id)
    setModal((state) => ({
      ...state,
      title: title,
      closed: false,
      approved: false,
    }))
  }

  if (loading) {
    return <LoadingBlog />
  }

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        {posts?.map((post) => (
          <div
            key={post?.id?.toString()}
            className={classNames(
              'flex w-10/12 flex-col gap-3 overflow-hidden rounded-xl  p-2 md:w-[724px] md:flex-row md:gap-0 md:p-3 lg:w-[960px] lg:p-5',
              post.published ? 'bg-white/10' : 'bg-red-800/70',
            )}
          >
            <div className="relative flex h-[220px] flex-row justify-center  overflow-hidden md:mx-2 md:w-[334px] lg:mx-4 lg:h-[300px] lg:w-[448px]">
              <PosterBlog
                image={post.featuredImage || ''}
                imageUrls={imageUrls}
              />
              {!post.published && (
                <div className="absolute bottom-0 left-0 bg-red-300 text-3xl">
                  {translate('Unpublished', lang)}
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between gap-3 px-2 md:h-[220px] md:w-[334px] md:gap-0 lg:h-[300px] lg:w-[448px] lg:gap-3 lg:px-4">
              <div className="flex flex-col justify-between gap-1 text-[var(--color-text-primary)] lg:flex-row lg:gap-0">
                <p className="whitespace-pre-wrap break-words pl-3 text-left text-base font-medium lg:w-4/6 lg:text-lg">
                  <Link href={`blog/${post.slug}`}>{post.title}</Link>
                </p>
                <p className="pl-3 text-sm font-medium text-[var(--color-text-secondary)] lg:pl-0 lg:text-base">
                  {formatDate(new Date(post.publishedAt!))}
                </p>
              </div>
              <p className="overflow-hidden text-ellipsis text-justify text-sm font-medium text-[var(--color-text-primary)] md:h-[120px] lg:h-[200px]">
                {post.description}
              </p>
              <div className="flex flex-row justify-between text-[var(--color-text-primary)]">
                <div className="flex flex-row items-center justify-center gap-2">
                  <BsClock />
                  <p className="pt-1">
                    {post.readingTime} {translate('min', lang)}
                  </p>
                </div>

                <div className="flex flex-row gap-3">
                  <div className="hover:bg-slate-300/30">
                    <Button variant={'text'} href={`/admin/blog/${post.slug}`}>
                      <FiEdit />
                    </Button>
                  </div>

                  <div className="hover:bg-slate-300/30">
                    <Button
                      variant={'text'}
                      onClick={() => handleClickDelete(post.id!, post.title)}
                    >
                      <AiTwotoneDelete />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="py-5">
        <PaginationClientSide
          page={page}
          setPage={setPage}
          limit={paginationLimit!}
          total={totalPosts}
        />
      </div>
      {!modal.closed && (
        <ModalDialog
          title="Delete post"
          body={
            <div className="flex flex-col items-center">
              {translate('Are you sure you want to delete the post', lang)}
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
    </>
  )
}
