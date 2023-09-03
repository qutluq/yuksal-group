import { useRef, useState } from 'react'
import type ReactQuill from 'react-quill'

export const useTextEditor = () => {
  const [content, setContent] = useState('')
  const quillRef = useRef<ReactQuill>(null)
  return { content, setContent, quillRef }
}
