import { PrismaClient } from '@prisma/client';
import {
  POSITIONS,
  SUBJECTS,
  TEACHERS,
  USERS,
  WORKLOAD_NORMS,
  WORKLOAD_PLANS,
  WORKLOAD_TYPES,
  WORKLOADS,
} from './data';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  await prisma.position.createMany({
    data: POSITIONS,
  });

  const usersWithHashedPasswords = await Promise.all(
    USERS.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    })),
  );

  await prisma.user.createMany({
    data: usersWithHashedPasswords,
  });

  await prisma.workLoadType.createMany({
    data: WORKLOAD_TYPES,
  });

  await prisma.subject.createMany({
    data: SUBJECTS,
  });

  // 3. Insert teachers and connect to users
  for (const teacher of TEACHERS) {
    const createdTeacher = await prisma.teacher.create({
      data: {
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        patronymic: teacher.patronymic,
        positionId: teacher.positionId,
        rate: teacher.rate,
        user: {
          connect: { id: teacher.userId },
        },
      },
    });
  }

  await prisma.workLoad.createMany({
    data: WORKLOADS,
  });

  await prisma.workloadPlan.createMany({
    data: WORKLOAD_PLANS,
  });

  await prisma.workNorm.createMany({
    data: WORKLOAD_NORMS,
  });

  console.log('Seed completed!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => prisma.$disconnect());
