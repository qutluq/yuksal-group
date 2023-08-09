import { count } from 'console'
import { cache } from 'react'

import page from '@/app/(site)/page'
import { PrismaClient } from '@prisma/client'

// Instantiate a single instance PrismaClient and save it on the globalThis object.
// Then we keep a check to only instantiate PrismaClient if it's not on the globalThis object otherwise use the same
// instance again if already present to prevent instantiating extra PrismaClient instances.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const getPosts = cache(async ({ page, limit }) => {
  const count = await prisma.post.count({
    where: {
      published: true,
    },
  })

  const results = await prisma.post.findMany({
    skip: (page - 1) * limit, // How many rows to skip
    take: limit, // Page size
    orderBy: {
      publishedAt: { sort: 'desc', nulls: 'last' },
    },
    where: {
      published: true,
    },
  })

  return { posts: results, total: count }
})

export const getPost = cache(async (slug: string) => {
  const result = await prisma.post.findMany({
    take: 1,
    where: {
      slug,
    },
  })

  return result
})

export const getAuthor = cache(async (id: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  return result
})
