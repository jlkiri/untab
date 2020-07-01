import { NowRequest, NowResponse } from "@vercel/node";
import { Magic } from "@magic-sdk/admin";
import { protect } from "../../lib/protect";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const handler = async (req: NowRequest, res: NowResponse, user) => {
  const userMetadata = await magic.users.getMetadataByIssuer(user.issuer);

  console.log(userMetadata);

  res.json(userMetadata);
};

export default (req: NowRequest, res: NowResponse) =>
  protect(req, res, handler);
