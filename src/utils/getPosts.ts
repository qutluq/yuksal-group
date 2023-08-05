import { prisma } from '@/utils/db'

export const getPosts = async ({ page, limit }) => {
  const count = await prisma.post.count()

  const results = await prisma.post.findMany({
    skip: (page - 1) * limit, // How many rows to skip
    take: limit, // Page size
  })

  return { posts: results, total: count }
}
