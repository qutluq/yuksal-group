'use client'

import dynamic from 'next/dynamic'

import { formats, toolbarOptions } from './options'

import type { RQ } from './types'
const DynamicQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')

    const Quill = ({ forwardedRef, ...props }: RQ) => (
      <RQ ref={forwardedRef} {...props} />
    )
    return Quill
  },
  { ssr: false },
)

export const TextEditor = ({ forwardedRef, ...rest }: RQ) => (
  <DynamicQuill
    forwardedRef={forwardedRef}
    theme="snow"
    formats={formats}
    modules={toolbarOptions}
    {...rest}
  />
)
