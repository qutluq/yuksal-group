import type { ReactNode } from 'react'
import sanitizeHtml from 'sanitize-html'

type PropTypes = {
  html: ReactNode
  options?: {
    allowedTags: string[]
    allowedAttributes: {
      string: string[]
    }
    allowedIframeHostnames: string[]
  }
}

const defaultOptions = {
  allowedTags: ['b', 'i', 'em', 'strong', 'a'],
  allowedAttributes: {
    a: ['href'],
  },
  allowedIframeHostnames: ['www.youtube.com'],
}

const sanitize = (dirty, options) => ({
  __html: sanitizeHtml(dirty, { ...defaultOptions, ...options }),
})

export const SanitizedHTML = ({ html, options }: PropTypes) => (
  <div dangerouslySetInnerHTML={sanitize(html, options)} />
)
