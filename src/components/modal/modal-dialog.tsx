import type { ReactElement } from 'react'

import { Button } from '@/components/button'

type PropTypes = {
  title: string
  body: string | ReactElement
  btnTitleCancel: string
  btnTitleAgree: string
  onClose: (response: boolean) => void
}

export const ModalDialog = ({
  title,
  body,
  btnTitleCancel,
  btnTitleAgree,
  onClose,
}: PropTypes) => {
  return (
    <div
      className="fixed left-0 top-0 z-20 flex h-screen w-screen flex-col items-center justify-center bg-black/10"
      onClick={() => onClose(false)}
    >
      <div className="flex max-h-[300px] w-[300px] flex-col gap-4 rounded-2xl border-8 border-black/10 bg-[var(--color-secondary)] p-5 sm:max-h-[500px] sm:w-[500px]">
        <div className="flex flex-row justify-end">
          <div className="flex w-10 items-center justify-center rounded-lg px-2 hover:bg-gray-900">
            <Button onClick={() => onClose(false)} variant="text">
              X
            </Button>
          </div>
        </div>
        <p className="flex flex-row justify-center text-2xl text-[var(--color-text-primary)]">
          {title}
        </p>
        <div className="justify-normal text-[var(--color-text-primary)]">
          {body}
        </div>
        <div className="flex flex-row justify-center gap-3">
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onClose(true)
            }}
            className="w-40"
          >
            {btnTitleAgree}
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onClose(false)
            }}
            className="w-40"
          >
            {btnTitleCancel}
          </Button>
        </div>
      </div>
    </div>
  )
}
