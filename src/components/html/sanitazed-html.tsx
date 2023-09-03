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
  allowedTags: [
    'b',
    'i',
    'em',
    'strong',
    'a',
    'u',
    'h1',
    'h2',
    'h3',
    'br',
    'ol',
    'li',
    'ul',
  ],
  allowedAttributes: {
    a: ['href', 'rel', 'target'],
  },
  allowedIframeHostnames: ['www.youtube.com'],
}

const sanitize = (dirty, options) => ({
  __html: sanitizeHtml(dirty, { ...defaultOptions, ...options }),
})

export const SanitizedHTML = ({ html, options }: PropTypes) => (
  <div dangerouslySetInnerHTML={sanitize(html, options)} />
)
