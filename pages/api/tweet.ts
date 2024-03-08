import { NextApiRequest, NextApiResponse } from "next";
import { Rettiwt } from "rettiwt-api";

type TweetId = string | string[] | undefined;
const retweetInstance = new Rettiwt({
  proxyUrl: new URL(process.env.NEXT_PUBLIC_PROXY_URL as string),
});

export default async function tweetApiRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tweetId: TweetId = req.query.tweetId;

  const response = await retweetInstance.tweet.details(tweetId as string);

  res.send(response);
}
