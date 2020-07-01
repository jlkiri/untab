import { NowRequest, NowResponse } from "@vercel/node";
import { authorize } from "../../lib/protect";
import { deleteBookmark } from "../../lib/db";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    await authorize(req.cookies);
  } catch {
    res.status(401).end();
  }

  const { id } = JSON.parse(req.body);

  try {
    await deleteBookmark(id);
    res.status(201).end();
  } catch {
    res.status(500).end();
  }
};
