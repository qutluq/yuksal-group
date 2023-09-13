export type TypeMenuPage =
  | 'admin'
  | 'home'
  | 'blog'
  | 'about'
  | 'gallery'
  | 'contact'

export type ImageFile = {
  id: string
  href: string
  file: File | null
}
