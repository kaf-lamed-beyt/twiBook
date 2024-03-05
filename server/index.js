import express from "express";
import ViteExpress from "vite-express";
import "dotenv/config";
export const app = express();
import { Rettiwt } from "rettiwt-api";

const retwittInstance = new Rettiwt();

const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

ViteExpress.config({
  mode,
});

ViteExpress.listen(app, 5173, () => console.log("Server is listening..."));

app.get("/api/twitter", async (req, res) => {
  const { tweetId } = req.query;
  const response = await retwittInstance.tweet.details(tweetId);

  res.send(response);
});
