import { NextApiRequest, NextApiResponse } from "next";
import { Rettiwt } from "rettiwt-api";

const retweetInstance = new Rettiwt({
  authProxyUrl: new URL(`${process.env.NEXT_PUBLIC_PROXY_URL}` || ""),
});

export default async function twitterUserApiRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = req.query;
  const response = await retweetInstance.user.details(user as string);

  res.status(200).json(response);
}
