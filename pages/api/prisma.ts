import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  async function main() {
    const users = await prisma.user.findMany();
    return users;
  }

  main()
    .catch((e) => {
      throw e;
    })

    .finally(async () => {
      await prisma.disconnect();
    });

  const response = await main();
  console.dir(response);

  res.json(response);
};
