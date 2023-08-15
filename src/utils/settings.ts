import { t } from '@lingui/macro'

import type { TYPE_MENU_PAGE } from '@/types/menu-page'

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

export const MENU_PAGES = (page: TYPE_MENU_PAGE) => {
  const pages = {
    home: t`home`,
    blog: t`blog`,
    about: t`about`,
    gallery: t`gallery`,
    contact: t`contact`,
  }

  return pages[page]
}
