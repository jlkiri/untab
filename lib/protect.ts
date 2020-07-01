import { NowRequest, NowResponse } from "@vercel/node";
import Iron from "@hapi/iron";
import Cookie from "./cookie";
import { User } from "../types/user";

type Handler = (request: NowRequest, response: NowResponse, user: User) => void;

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
