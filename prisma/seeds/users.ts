import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

type SessionUserType = {
  id?: number
  name: string
  email: string
  password: string
  image?: string
}

const prisma = new PrismaClient()

const seedUsers = async (count: number = 10) => {
  const users: SessionUserType[] = [
    {
      name: 'Yuksal Admin',
      email: process.env.SEED_ADMIN_EMAIL!,
      password: process.env.SEED_ADMIN_PASSWORD!,
    },
  ]

  for (let i = 0; i < count; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 20 }),
    })
  }

  console.log(`Seeding ${users.length} users`)

  const records = await prisma.user.createMany({
    data: users,
  })

  console.log(`🎉 Seeded ${records.count} users`)
  return records
}

export default seedUsers
