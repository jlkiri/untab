import { PrismaClient } from "@prisma/client";
import { NowRequest, NowResponse } from "@vercel/node";
import { protect } from "../../lib/protect";

const prisma = new PrismaClient();

const handler = async (req: NowRequest, res: NowResponse) => {
  try {
    const { id } = JSON.parse(req.body);
    await prisma.bookmark.delete({ where: { id } });
    res.status(201).end();
  } catch (e) {
    console.error(e);

    await prisma.disconnect();
    res.status(500).end();
  }
};

export default (req: NowRequest, res: NowResponse) =>
  protect(req, res, handler);
