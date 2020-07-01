import { NowRequest, NowResponse } from "@vercel/node";
import { authorize } from "../../lib/protect";
import { getUser } from "../../lib/db";

export default async (req: NowRequest, res: NowResponse) => {
  let user;

  try {
    user = await authorize(req.cookies);
  } catch {
    res.status(401).end();
  }

  try {
    const userData = await getUser(user);
    res.json(userData);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};
