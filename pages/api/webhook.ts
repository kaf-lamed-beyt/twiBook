import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { buffer } from "micro";
import { createClient } from "@supabase/supabase-js";

export type Events =
  | "order_created"
  | "order_refunded"
  | "subscription_created"
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
    const supabase = createClient(
      process.env.NEXT_PUBLIC_PROJECT_URL!,
      process.env.NEXT_PUBLIC_SERVICE_KEY!
    );

    const eventType = req.headers["x-event-name"];

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
    const userId = parsedBody.meta.custom_data.user_id;

    if (eventType === "order_created" && isPaymentSuccessful) {
      const licenseType =
        parsedBody.data.attributes.first_order_item.product_name.toLowerCase();
      const currency = parsedBody.data.attributes.currency;
      const price = parsedBody.data.attributes.total_formatted;

      try {
        const updateAccount = async () => {
          const { error } = await supabase
            .from("account")
            .update({
              has_license: true,
              license_type: licenseType,
              currency: currency,
              amount_paid: price,
            })
            .eq("id", userId);

          if (error) {
            res.json({ message: error });
            console.error(error);
          }
        };

        updateAccount();
      } catch (error) {
        res.json({ message: error });
        console.error(error);
      }
    } else if (eventType === "subscription_created") {
      const renewsAt = parsedBody.data.attributes.renews_at;
      const cardBrand = parsedBody.data.attributes.card_brand;
      const subscriptionDate = parsedBody.data.attributes.created_at;

      try {
        const updateAccount = async () => {
          const { error } = await supabase
            .from("account")
            .update({
              order_created_at: subscriptionDate,
              license_expires_at: renewsAt,
              card_brand: cardBrand,
            })
            .eq("id", userId);

          if (error) {
            res.json({ message: error });
            console.error(error);
          }
        };

        updateAccount();
      } catch (error) {
        res.json({ message: error });
        console.error(error);
      }
    } else if (eventType === "subscription_cancelled" || eventType === "subscription_expired") {
      try {
        const updateAccount = async () => {
          const { error } = await supabase
            .from("account")
            .update({
              order_created_at: null,
              sub_cancelled_date: new Date().toISOString(),
              license_expires_at: null,
              card_brand: null,
              has_license: false,
              license_type: "free",
              amount_paid: null,
            })
            .eq("id", userId);

          if (error) {
            res.json({ message: error });
            console.error(error);
          }
        };

        updateAccount();
      } catch (error) {
        res.json({ message: error });
        console.error(error);
      }
    } else {
      return res
        .status(400)
        .json({ message: `Unknown event type: ${eventType}` });
    }

    res.json({ message: "Webhook received!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
