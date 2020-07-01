import { NowRequest, NowResponse } from "@vercel/node";
import { IncomingMessage, ServerResponse } from "http";
import Iron from "@hapi/iron";
import Cookie from "./cookie";
import { MagicUserMetadata } from "@magic-sdk/admin";

type Handler = (request: NowRequest, response: NowResponse, user) => void;
type StaticHandler = (
  request: IncomingMessage,
  response: ServerResponse,
  user
) => Promise<MagicUserMetadata>;

export async function protectStatic(
  request: IncomingMessage,
  response: ServerResponse,
  cookies: object,
  next: StaticHandler
) {
  let user;
  try {
    user = await Iron.unseal(
      Cookie.getAuthToken(cookies),
      process.env.ENCRYPTION_SECRET,
      Iron.defaults
    );
  } catch (error) {
    throw error;
  }

  return next(request, response, user);
}

export async function protect(
  request: NowRequest,
  response: NowResponse,
  next: Handler
) {
  let user;
  try {
    user = await Iron.unseal(
      Cookie.getAuthToken(request.cookies),
      process.env.ENCRYPTION_SECRET,
      Iron.defaults
    );
  } catch (error) {
    response.status(401).end();
  }

  next(request, response, user);
}
