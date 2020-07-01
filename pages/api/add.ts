import { PrismaClient } from "@prisma/client";
import { NowRequest, NowResponse } from "@vercel/node";
import { protect } from "../../lib/protect";
import { User } from "../../types/user";

const prisma = new PrismaClient();

const handler = async (req: NowRequest, res: NowResponse, user: User) => {
  const { label, url } = req.body;

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

    res.json(bookmark);
  } catch {
    await prisma.disconnect();
    res.status(500).end();
  }
};

export default (req: NowRequest, res: NowResponse) =>
  protect(req, res, handler);
