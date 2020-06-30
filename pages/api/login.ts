import { Magic } from "@magic-sdk/admin";
import Iron from "@hapi/iron";
import { PrismaClient } from "@prisma/client";
import Cookie from "../../lib/cookie";

const prisma = new PrismaClient();

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  let user;

  try {
    // exchange the DID from Magic for some user data
    const did = magic.utils.parseAuthorizationHeader(req.headers.authorization);

    user = await magic.users.getMetadataByToken(did);

    console.log(user);

    const isUserRegistered = await prisma.user.findOne({
      where: { id: user.issuer },
    });

    console.log(isUserRegistered);

    if (!isUserRegistered) {
      await prisma.user.create({ data: { id: user.issuer, name: "testuser" } });
    }
  } catch {
    return res.status(401).end();
  }

  const token = await Iron.seal(
    user,
    process.env.ENCRYPTION_SECRET,
    Iron.defaults
  );

  Cookie.setTokenCookie(res, token);

  res.end();
};
