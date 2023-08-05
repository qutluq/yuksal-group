import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import seedUsers from './users'

type BlogPostType = {
  title: string
  content: string
  authorId: number
  published: boolean
  publishedAt: Date
  updatedAt: Date
}

const seedBlog = async (count: number = 11) => {
  const prisma = new PrismaClient()

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: process.env.SEED_ADMIN_EMAIL!,
      },
    })

    if (user) {
      try {
        const posts: BlogPostType[] = []

        for (let i = 0; i < count; i++) {
          posts.push({
            title: faker.commerce.productName(),
            content: faker.lorem.paragraph({ min: 5, max: 11 }),
            authorId: user.id,
            published: true,
            publishedAt: new Date(),
            updatedAt: new Date(),
          })
        }

        const records = await prisma.post.createMany({
          data: posts,
        })

        console.log(`🚀 Seeded ${records.count} posts`)
        return records
      } catch (error) {
        console.error('Error creating new posts:', error)
      } finally {
        await prisma.$disconnect()
      }
    } else {
      console.log('❌ Admin user not found.')
      throw new Error('Admin user not found')
    }
  } catch (error) {
    console.error('❌ Error finding user:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

export default seedBlog
