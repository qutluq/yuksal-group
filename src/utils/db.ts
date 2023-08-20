import type { Post } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { cache } from 'react'

import type { Translation } from '@/types'

import { slugify } from './'

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

export const getAllTranslations = cache(async () => {
  const results = await prisma.translation.findMany({})

  const translations: { [id: string]: Translation } = {}
  for (const translation of results) {
    translations[translation.id] = translation
  }

  return translations
})

export const getTranslationFunction = (translations, lang) => (text) =>
  getTranslation({ translations, lang, text })

export const getTranslation = cache(
  ({
    translations,
    lang,
    text,
  }: {
    translations: { [id: string]: Translation }
    lang: string
    text: string
  }) => {
    const result = translations[slugify(text)]
    return result ? result[lang] : text
  },
)

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
    nextPost: nextPost,
    previousPost: previousPost,
  }
}
