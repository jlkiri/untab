import { NowRequest, NowResponse } from "@vercel/node";
import { cleanupBookmarks } from "../../lib/db";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const bms = await cleanupBookmarks();
    res.json(bms);
  } catch {
    res.status(500).end();
  }
};
