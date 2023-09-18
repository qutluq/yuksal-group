import { PrismaClient } from '@prisma/client'
import { cache } from 'react'

import type { Post } from '@/types/blog'
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

export const deletePost = async (id: number) => {
  const deletedPost = await prisma.post.delete({
    where: {
      id: id,
    },
  })

  return deletedPost
}

export const getPosts = cache(
  async ({
    page,
    limit,
    select = 'published',
  }: {
    page: number
    limit: number
    select: 'published' | 'all'
  }) => {
    const conditions =
      select == 'published'
        ? {
            where: {
              published: true,
            },
          }
        : undefined

    const count = await prisma.post.count(conditions)

    const results = await prisma.post.findMany({
      skip: (page - 1) * limit, // How many rows to skip
      take: limit, // Page size
      orderBy: {
        publishedAt: { sort: 'desc', nulls: 'last' },
      },
      ...conditions,
    })

    return { posts: results, total: count }
  },
)

export const updatePost = cache(async (id: number, post: Post) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { authorId, ...data } = post
  try {
    await prisma.post.update({
      where: {
        id: id,
      },
      data: data,
    })
  } catch (error) {
    console.error(`❌ Can not update post with id ${id}: `, error)
    return false
  }
  return true
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

export const getNeighbourPosts = async (post: Post) => {
  // Get previous post
  const nextPost = await prisma.post.findFirst({
    where: {
      published: true,
      publishedAt: {
        lt: post.publishedAt!,
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
  })

  // Get next post
  const previousPost = await prisma.post.findFirst({
    where: {
      published: true,
      publishedAt: {
        gt: post.publishedAt!,
      },
    },
    orderBy: {
      publishedAt: 'asc',
    },
  })

  return {
    nextPost: nextPost as Post,
    previousPost: previousPost as Post,
  }
}
