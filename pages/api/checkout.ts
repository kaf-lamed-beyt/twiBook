// import type { NextApiResponse, NextApiRequest } from "next";
// import { buffer } from "micro";
// import crypto from "crypto";
// import { supabase } from "../../supabase";

// // you might need to extend this if you need additional properties from the request body
// // details: https://docs.lemonsqueezy.com/api/webhooks
// export interface ResBody extends NextApiRequest {
//   body: {
//     meta: {
//       event_name:
//         | "order_created"
//         | "order_refunded"
//         | "subscription_created"
//         | "subscription_updated";
//     };
//     data: {
//       id: string;
//       attributes: {
//         total: string;
//         currency: string;
//         next_payment_date: string;
//         ends_at: string;
//         created_at: string;
//         product_name: string;
//         card_brand: string;
//         user_email: string;
//         renews_at: string;
//         urls: {
//           update_payment_method: string;
//         };
//       };
//     };
//   };
// }

// //custom config to disable body-parser
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req: ResBody, res: NextApiResponse) {
//   // you need to set this webhook secret inside your Lemon Squeezy account
//   // Settings -> Webhooks -> create or click on a webhook URL, set the secret
//   const signingSecret = http://process.env.NEXT_PUBLIC_LEMON_SECRET || "";

//   if (req.method !== "POST") {
//     // you can see whether a webhook delivers successfully in your Lemon Squeezy account
//     // -> Settings -> Webhooks -> Recent deliveries
//     return res.status(405).json({
//       message: "Method not allowed",
//     });
//   }

//   try {
//     // check that the request really came from Lemon Squeezy and is about this order
//     const rawBody = (await buffer(req)).toString("utf-8");
//     const hmac = crypto.createHmac("sha256", signingSecret);
//     const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
//     const signature = Buffer.from(req.headers["x-signature"] as string, "utf8");

//     //compares the digest and signature and returns a message
//     if (!crypto.timingSafeEqual(digest, signature)) {
//       return res.status(400).json({
//         message: "Invalid signature.",
//       });
//     }

//     //parses the rawBody
//     const payload: ResBody["body"] = JSON.parse(rawBody);

//     const {
//       meta: { event_name: eventName },
//       data: { id: orderId, attributes: data },
//     } = payload;

//     if (eventName === "order_created") {
//       // do something when a new purchase comes in
//       const insertToProfile = async () => {
//         await supabase
//           .from("profile")
//           .update({
//             event: "subscription.create",
//             status: "active",
//             amount: http://data.total,
//             currency: data.currency,
//             authorization_code: "",
//             next_payment_date: data.ends_at,
//             created_date_at: data.created_at,
//             exp_month: data.ends_at,
//             plan_name: data.product_name,
//             plan_interval: data.renews_at,
//             signature: data.urls.update_payment_method,
//             bank: data.card_brand,
//             card_type: data.card_brand,
//             brand: data.card_brand,
//             subscription_code: "",
//           })
//           //This is the bridge between the response from paystack and our database (the email is the same in both)
//           .eq("email", data.user_email)
//           .select();
//         // return res.status(200).json({
//         //   status: true,
//         //   message: "Order placed successfully!",
//         // });
//       };
//       insertToProfile();

//     } else if (eventName === "order_refunded") {
//       // do something when the purchase is refunded
//     } else if (eventName === "subscription_updated") {
//       // do something when the purchase is updated
//       const insertToProfile = async () => {
//         await supabase
//           .from("profile")
//           .update({
//             event: "subscription.create",
//             status: "reactivated",
//             amount: http://data.total,
//             currency: data.currency,
//             authorization_code: "",
//             next_payment_date: data.ends_at,
//             created_date_at: data.created_at,
//             exp_month: data.ends_at,
//             plan_name: data.product_name,
//             plan_interval: data.renews_at,
//             signature: data.urls.update_payment_method,
//             bank: data.card_brand,
//             card_type: data.card_brand,
//             brand: data.card_brand,
//             subscription_code: "",
//           })
//           //This is the bridge between the response from paystack and our database (the email is the same in both)
//           .eq("email", data.user_email)
//           .select();
//         // return res.status(200).json({
//         //   status: true,
//         //   message: "Order updated successfully!",
//         // });
//       };
//       insertToProfile();
//     } else if (eventName === "subscription_created") {
//       // update the profile table when a "subscription.create" is available
//       const insertToProfile = async () => {
//         await supabase
//           .from("profile")
//           .update({
//             event: "subscription.create",
//             status: "active",
//             amount: http://data.total,
//             currency: data.currency,
//             authorization_code: "",
//             next_payment_date: data.ends_at,
//             created_date_at: data.created_at,
//             exp_month: data.ends_at,
//             plan_name: data.product_name,
//             plan_interval: data.renews_at,
//             signature: data.urls.update_payment_method,
//             bank: data.card_brand,
//             card_type: data.card_brand,
//             brand: data.card_brand,
//             subscription_code: "",
//           })
//           //This is the bridge between the response from paystack and our database (the email is the same in both)
//           .eq("email", data.user_email)
//           .select();
//         // return res.status(200).json({
//         //   status: true,
//         //   message: "Order placed successfully!",
//         // });
//       };
//       insertToProfile();
//       // do somthing with any of the following events:
//       // - subscription_created
//       // - subscription_cancelled
//       // - subscription_resumed
//       // - subscription_expired
//       // - subscription_paused
//       // - subscription_unpaused
//       // - subscription_payment_failed
//       // - subscription_payment_success
//       // - subscription_payment_recovered
//       // - license_key_created
//     } else {
//       return res.status(400).json({
//         message: `Unknown event name: ${eventName} for order:  (${orderId})`,
//       });
//     }
//   } catch (e: unknown) {
//     if (typeof e === "string") {
//       return res.status(400).json({
//         message: `Webhook error: ${e}`,
//       });
//     }
//     if (e instanceof Error) {
//       return res.status(400).json({
//         message: `Webhook error: ${e.message}`,
//       });
//     }
//     throw e;
//   }

//   // if no errors occur, respond with a 200 success
//   res.send({ received: true });
// }
