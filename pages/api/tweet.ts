import { NextApiRequest, NextApiResponse } from "next";
import { Rettiwt } from "rettiwt-api";

type TweetId = string | string[] | undefined;

export default async function tweetApiRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tweetId: TweetId = req.query.tweetId;
  const retweetInstance = new Rettiwt();

  const response = await retweetInstance.tweet.details(tweetId as string);

  res.status(200).send(response);
}
