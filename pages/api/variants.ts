import { NextApiRequest, NextApiResponse } from "next";

export default async function twiBookProductVariants(req: NextApiRequest, res: NextApiResponse) {
  try {
    const endpoint = "https://api.lemonsqueezy.com/v1/variants";

    const request = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${process.env.LEMSQUEEZY_KEY}`,
      },
    });

    const response = await request.json();
    res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occured" });
  }
}
