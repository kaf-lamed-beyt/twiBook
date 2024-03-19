import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { buffer } from "micro";
import { supabase } from "@utils/supabase/client";

export type Events =
  | "order_created"
  | "subscription_created"
  | "order_refunded"
  | "subscription_cancelled";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function lemonWebhookRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Extract body from the request
    const body = req.body;
    const eventType = req.headers["X-Event-Name"];

    // check signature
    const rawBody = (await buffer(req)).toString("utf-8");
    const hmac = crypto.createHmac(
      "sha256",
      process.env.LEMSQUEEZY_WEBHOOK_SIG as string
    );
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signature = Buffer.from(req.headers["x-signature"] as string, "utf8");

    //compares the digest and signature and returns a message
    if (!crypto.timingSafeEqual(digest, signature)) {
      return res.status(400).json({
        message: "Invalid signature.",
      });
    }

    const parsedBody = JSON.parse(rawBody);
    const isPaymentSuccessful = parsedBody.data.attributes.status === "paid";

    if (eventType === "order_created") {
      console.log("yes")
      const price = parsedBody.data.attributes.subtotal_formatted;
      const licenseType =
        parsedBody.data.attributes.first_order_item.product_name;

      await supabase.from("account").update({
        has_license: true,
        license_type: licenseType,
      });
    }

    res.json({ message: "Webhook received!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
