import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  async function main() {
    const post = await prisma.post.update({
      where: { id: 1 },

      data: { published: true },
    });
    return post;
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

  res.status(200).end();
};
