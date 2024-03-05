import express from "express";
import axios from "axios";

export const app = express();

if (process.env.NODE_ENV === "production") {
  const frontendFiles = process.cwd() + "/dist";
  app.use(express.static(frontendFiles));
  app.get("/*", (_, res) => {
    res.send(frontendFiles + "/index.html");
  });
  app.listen(process.env["PORT"]);
}

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: { "Access-Control-Allow-Origin": "*" },
});

app.get("/api/test", async (_, res) => {
  const response = await axiosInstance.get("/todos");

  res.status(200).send(response.data);
});
