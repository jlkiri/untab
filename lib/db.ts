import { prisma } from "./prisma_client";
import { Magic } from "@magic-sdk/admin";

export const getBookmarks = async (user) => {
  // const prisma = new PrismaClient();
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: user.issuer },
      orderBy: {
        createdAt: "asc",
      },
    });
    return bookmarks;
  } catch (e) {
    console.error(e);

    await prisma.disconnect();
    throw e;
  }
};

export const cleanupBookmarks = async () => {
  // const prisma = new PrismaClient();
  try {
    const bookmarks = await prisma.bookmark.deleteMany({
      where: {
        createdAt: {
          lte: new Date((new Date().getTime() / 1000 - 24 * 3600) * 1000),
        },
      },
    });
    return bookmarks;
  } catch (e) {
    console.error(e);

    await prisma.disconnect();
    throw e;
  }
};

export const getBookmarkCount = async (user) => {
  // const prisma = new PrismaClient();
  try {
    const bookmarks = await prisma.bookmark.count({
      where: { userId: user.issuer },
      orderBy: {
        createdAt: "asc",
      },
    });
    return bookmarks;
  } catch (e) {
    console.error(e);

    await prisma.disconnect();
    throw e;
  }
};

export const addBookmark = async (label, url, user) => {
  // const prisma = new PrismaClient();
  try {
    const bookmark = await prisma.bookmark.create({
      data: {
        url,
        label,
        user: {
          connect: {
            id: user.issuer,
          },
        },
      },
    });
    return bookmark;
  } catch (e) {
    console.error(e);

    await prisma.disconnect();
    throw e;
  }
};

export const deleteBookmark = async (id) => {
  // const prisma = new PrismaClient();
  try {
    await prisma.bookmark.delete({ where: { id } });
  } catch (e) {
    console.error(e);

    await prisma.disconnect();
    throw e;
  }
};

export const getUser = async (user) => {
  const magic = new Magic(process.env.MAGIC_SECRET_KEY);
  const userMetadata = await magic.users.getMetadataByIssuer(user.issuer);
  return userMetadata;
};
