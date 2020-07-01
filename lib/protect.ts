import { NowRequest, NowResponse } from "@vercel/node";
import Iron from "@hapi/iron";
import Cookie from "./cookie";

type Handler = (request: NowRequest, response: NowResponse, user: any) => void;

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
