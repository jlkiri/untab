import { NowRequest, NowResponse } from "@vercel/node";
import { authorize } from "../../lib/protect";
import { addBookmark } from "../../lib/db";

export default async (req: NowRequest, res: NowResponse) => {
  let user;

  try {
    user = await authorize(req.cookies);
  } catch {
    res.status(401).end();
  }

  const { label, url, count } = JSON.parse(req.body);

  try {
    const bookmark = await addBookmark(label, url, user);
    res.json({ bookmark, isLimit: count === 49 });
  } catch {
    res.status(500).end();
  }
};
