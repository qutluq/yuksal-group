import type { Dispatch, SetStateAction } from 'react'
import type ReactQuill from 'react-quill'
import type { ReactQuillProps } from 'react-quill'

export interface RQ extends ReactQuillProps {
  forwardedRef?: React.Ref<ReactQuill>
  value?: string
  onChange?: Dispatch<SetStateAction<string>>
}
