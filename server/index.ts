import express from "express";

export const app = express();

if (process.env.NODE_ENV === "production") {
  const frontendFiles = process.cwd() + "/dist";
  app.use(express.static(frontendFiles));
  app.get("/*", (_, res) => {
    res.send(frontendFiles + "/index.html");
  });
  app.listen(process.env["PORT"]);
}

app.get("/api/test", (_, res) => res.json({ greeting: "Hello" }));
