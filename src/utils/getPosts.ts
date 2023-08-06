import { cache } from 'react'
import { prisma } from '@/utils/db'

export const getPosts = cache(async ({ page, limit }) => {
  const count = await prisma.post.count()

  const results = await prisma.post.findMany({
    skip: (page - 1) * limit, // How many rows to skip
    take: limit, // Page size
  })

  return { posts: results, total: count }
})
