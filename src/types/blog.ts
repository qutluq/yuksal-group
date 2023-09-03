export type Post = {
  id?: number
  authorId: number
  content: string
  createdAt?: Date
  description: string
  published: boolean
  publishedAt: Date | null
  featuredImage?: string
  readingTime: number
  slug: string
  title: string
  updatedAt: Date
}
