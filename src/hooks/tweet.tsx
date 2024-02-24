import { useQuery } from "@tanstack/react-query";

import { Client } from "twitter-api-sdk";
const twitter = new Client(process.env.TWITTER_BEARER as string);

const getTweetById = async () => {
  try {
    const data = await twitter.tweets.findTweetsById({
      ids: ["1757864818877325495"],
    });
    console.log(data?.data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useTweet = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["get-tweet"],
    queryFn: getTweetById,
  });

  return {
    error,
    loading: isPending,
    tweet: data?.data, // tweet from the bookmark
  };
};
