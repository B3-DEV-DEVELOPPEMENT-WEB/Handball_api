import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = ['Coach', 'Contributeur', 'Joueur'];

  for (const name of roles) {
    await prisma.privilege.create({
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