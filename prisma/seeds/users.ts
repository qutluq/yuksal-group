import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

type SessionUserType = {
  id?: string;
  name: string;
  email: string;
  image?: string;
};

const prisma = new PrismaClient();


const seedUsers = async (count: number = 10) => {
  const users: SessionUserType[] = [
    {
      name: faker.name.fullName(),
      email: "envless@example.com",
    },
  ];

  for (let i = 0; i < count; i++) {
    users.push({
      name: faker.name.fullName(),
      email: faker.internet.email(),
    });
  }

  console.log(`Seeding ${users.length} users`);

  const records = await prisma.user.createMany({
    data: users,
  });

  console.log(`🎉 Seeded ${records.count} users`);
  return records;
};

export default seedUsers;
