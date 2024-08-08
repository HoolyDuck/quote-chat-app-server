import express, { Express, Request, Response } from "express";
import "dotenv/config";

import mongoose from "mongoose";
import passport from "passport";
import { googleStrategy } from "./lib/passport-oauth/passport-oauth";
import { ENV_VARS } from "./common/constants/env-vars";

const app: Express = express();
const port = process.env.PORT || 3000;

mongoose.connect(ENV_VARS.DATABASE_URL!, {});
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("[database]: Connected to database"));

app.use(express.json());
app.use(passport.initialize());

passport.use(googleStrategy);

app.get("/", async (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"], session: false })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req: Request, res: Response) => {
    res.redirect("/");
  }
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
