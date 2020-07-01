import { NowRequest, NowResponse } from "@vercel/node";
import { Magic } from "@magic-sdk/admin";
import Cookie from "../../lib/cookie";
import { protect } from "../../lib/protect";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const handler = async (req: NowRequest, res: NowResponse, user) => {
  if (req.method !== "POST") return res.status(405).end();

  await magic.users.logoutByIssuer(user.issuer);

  Cookie.clearCookie(res);

  res.end();
};

export default (req: NowRequest, res: NowResponse) =>
  protect(req, res, handler);
