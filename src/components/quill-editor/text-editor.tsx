'use client'

import 'react-quill/dist/quill.snow.css'

import dynamic from 'next/dynamic'

import { formats } from './formats'
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
    {...rest}
  />
)
