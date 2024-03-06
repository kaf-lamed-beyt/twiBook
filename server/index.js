import express from "express";
import ViteExpress from "vite-express";
import { Rettiwt } from "rettiwt-api";
import "dotenv/config";

export const app = express();

const retwittInstance = new Rettiwt();

ViteExpress.config({
  mode: "production",
});

const server = app.listen(5173, "0.0.0.0", () => {
  console.log("Server is listening...");
});

ViteExpress.bind(app, server);

app.get("/api/twitter", async (req, res) => {
  const { tweetId } = req.query;
  const response = await retwittInstance.tweet.details(tweetId);

  res.send(response);
});
