import express from "express";
import ViteExpress from "vite-express";
import { Rettiwt } from "rettiwt-api";
import "dotenv/config";

export const app = express();

const retwittInstance = new Rettiwt();
const port = process.env.PORT || 3000;
const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

ViteExpress.config({
  mode,
});

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on ${port}`);
});

app.get("/api/twitter", async (req, res) => {
  const { tweetId } = req.query;
  const response = await retwittInstance.tweet.details(tweetId);

  res.send(response);
});

ViteExpress.bind(app, server);
