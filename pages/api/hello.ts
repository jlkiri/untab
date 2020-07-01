// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NowRequest, NowResponse } from "@vercel/node";

export default (req: NowRequest, res: NowResponse) => {
  res.status(200).end("hello");
};
