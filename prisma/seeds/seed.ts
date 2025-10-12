import { PrismaClient } from '@prisma/client';
import { ROLES, USERS } from './data';
const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: ROLES,
  });

  await prisma.user.createMany({
    data: USERS,
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => prisma.$disconnect());
