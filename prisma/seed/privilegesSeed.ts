import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const userPrivilege = {
    data: {
      name: 'User',
    },
  };

  const adminPrivilege = {
    data: {
      name: 'Admin',
    },
  };

  await prisma.privileges.create(userPrivilege);
  await prisma.privileges.create(adminPrivilege);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
