import { PrismaClient } from "@prisma/client";
import { NowRequest, NowResponse } from "@vercel/node";
import { protect } from "../../lib/protect";

const prisma = new PrismaClient();

const handler = async (req: NowRequest, res: NowResponse, user) => {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { user: user.issuer },
      orderBy: {
        createdAt: "asc",
      },
    });
    res.json(bookmarks);
  } catch {
    await prisma.disconnect();
    res.status(500).end();
  }
};

export default (req: NowRequest, res: NowResponse) =>
  protect(req, res, handler);
