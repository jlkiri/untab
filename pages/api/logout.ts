import { NowRequest, NowResponse } from "@vercel/node";
import { Magic } from "@magic-sdk/admin";
import Cookie from "../../lib/cookie";
import { authorize } from "../../lib/protect";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async (req: NowRequest, res: NowResponse) => {
  if (req.method !== "POST") return res.status(405).end();

  let user;

  try {
    user = authorize(req.cookies);
  } catch {
    res.status(401).end();
  }

  await magic.users.logoutByIssuer(user.issuer);

  Cookie.clearCookie(res);

  res.end();
};
