import { t } from '@lingui/macro'

export const PAGINATION_LIMIT = 10
export const DEFAULT_POSTER_POSTS_IMG = '/img/default-poster-posts.jpg' //aspect ratio: 450:300
export const DEFAULT_AUTHOR_IMG = '/img/default-author-img.png' //aspect ratio: 450:300
export const LOGO_IMG = '/img/logo.png' //aspect ratio: 200:36
export const NAV_MENU = () => [
  { id: 'home', name: t`home`, slug: 'home' },
  { id: 'blog', name: t`blog`, slug: 'blog' },
  { id: 'about', name: t`about`, slug: 'about' },
  { id: 'gallery', name: t`gallery`, slug: 'gallery' },
  { id: 'contact', name: t`contact`, slug: 'contact' },
]
