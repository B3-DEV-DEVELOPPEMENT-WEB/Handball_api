import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = ['coach', 'contributeur', 'joueur'];

  for (const name of roles) {
    await prisma.privileges.create({
      data: {
        name,
      },
    });
  }

  console.log(`Roles [${roles.join(', ')}] created.`);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
