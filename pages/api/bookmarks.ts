import { NowRequest, NowResponse } from "@vercel/node";
import { authorize } from "../../lib/protect";
import { getBookmarks } from "../../lib/db";

export default async (req: NowRequest, res: NowResponse) => {
  let user;

  try {
    user = await authorize(req.cookies);
  } catch {
    res.status(401).end();
  }

  try {
    const bookmarks = await getBookmarks(user);
    res.json(bookmarks);
  } catch {
    res.status(500).end();
  }
};
