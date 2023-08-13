import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seedAdmin = async () => {
  await prisma.user
    .upsert({
      where: { email: process.env.SEED_ADMIN_EMAIL! },
      update: {},
      create: {
        email: process.env.SEED_ADMIN_EMAIL!,
        password: process.env.SEED_ADMIN_PASSWORD!,
        name: 'Yuksal Admin',
      },
    })
    .then((user) => {
      console.log(`🎉 Seeded admin user`)
      console.log({ user })
      prisma.$disconnect()
    })
    .catch(async (e: any) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
}

export default seedAdmin
