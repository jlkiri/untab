import { NowRequest, NowResponse } from "@vercel/node";
import { authorize } from "../../lib/protect";
import { getBookmarkCount } from "../../lib/db";

export default async (req: NowRequest, res: NowResponse) => {
  let user;

  try {
    user = await authorize(req.cookies);
  } catch {
    res.status(401).end();
  }

  try {
    const bookmarks = await getBookmarkCount(user);
    res.json(bookmarks);
  } catch {
    res.status(500).end();
  }
};
