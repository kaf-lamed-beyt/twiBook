import express from "express";
import ViteExpress from "vite-express";
import { Rettiwt } from "rettiwt-api";
import "dotenv/config";

export const app = express();

const retwittInstance = new Rettiwt();

ViteExpress.config({
  mode: "production",
});

const port = process.env.PORT || 3000;

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on ${port}`);
});

ViteExpress.bind(app, server);

app.get("/api/twitter", async (req, res) => {
  const { tweetId } = req.query;
  const response = await retwittInstance.tweet.details(tweetId);

  res.send(response);
});
