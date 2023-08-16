export type Post = {
  id: number
  title: string
  slug: string
  content: string
  description: string
  readingTime: number
  authorId: number
  published: boolean
  createdAt: Date
  publishedAt: Date | null
  updatedAt: Date
}
