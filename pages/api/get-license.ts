import { NextApiRequest, NextApiResponse } from "next";

export default async function licenseApiRout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const requestData = req.body;

    if (!requestData.productId)
      return res.status(400).json({ message: "Product id is required" });

    const requestBody = JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: {
              user_id: requestData.userId.toString(),
            },
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: process.env.LEMSQUEEZY_STORE_ID?.toString(),
            },
          },
          variant: {
            data: {
              type: "variants",
              id: requestData.productId.toString(),
            },
          },
        },
      },
    });

    const request = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${process.env.LEMSQUEEZY_KEY}`,
      },
      body: requestBody,
    });

    const response = await request.json();
    const checkoutUrl = response?.data;

    res.status(200).send(checkoutUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occured" });
  }
}
