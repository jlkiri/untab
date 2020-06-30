import Iron from "@hapi/iron";
import { Magic } from "@magic-sdk/admin";
import Cookie from "../../lib/cookie";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async (req, res) => {
  let user;
  try {
    user = await Iron.unseal(
      Cookie.getAuthToken(req.cookies),
      process.env.ENCRYPTION_SECRET,
      Iron.defaults
    );
  } catch (error) {
    res.status(401).end();
  }

  const userMetadata = await magic.users.getMetadataByIssuer(user.issuer);

  console.log(userMetadata);

  res.json(userMetadata);
};
