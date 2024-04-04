import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const CoachPrivilege = {
    data: {
      name: 'Coach',
    },
  };

  const ContributeurPrivilege = {
    data: {
      name: 'Contributeur',
    },
  };

  const JoueurPrivilege = {
    data: {
      name: 'Joueur',
    },
  };

  await prisma.privileges.create(CoachPrivilege);
  await prisma.privileges.create(ContributeurPrivilege);
  await prisma.privileges.create(JoueurPrivilege);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
