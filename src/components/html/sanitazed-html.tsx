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
    'p',
    'span',
    'sup',
    'sub',
  ],
  allowedAttributes: {
    a: ['href', 'rel', 'target'],
    em: ['style'],
    p: ['class'],
    strong: ['class'],
    span: ['class'],
    sup: ['class'],
    sub: ['class'],
  },
  allowedIframeHostnames: ['www.youtube.com'],
}

const sanitize = (dirty, options) => ({
  __html: sanitizeHtml(dirty, { ...defaultOptions, ...options }),
})

export const SanitizedHTML = ({ html, options }: PropTypes) => (
  <div dangerouslySetInnerHTML={sanitize(html, options)} />
)
