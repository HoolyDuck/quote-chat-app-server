import express, { Express, Request, Response } from "express";
import "dotenv/config";

import mongoose from "mongoose";
import passport from "passport";
import { googleStrategy } from "./lib/passport-oauth/passport-oauth";
import { ENV_VARS } from "./common/constants/env-vars";
import { authRouter } from "./routes/auth/auth.routes";
import { privateRouteMiddleware } from "./middlewares/auth/private-route.middleware";
import cookieParser from "cookie-parser";

const app: Express = express();
const port = process.env.PORT || 3000;

mongoose.connect(ENV_VARS.DATABASE_URL!, {});
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("[database]: Connected to database"));

app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());

passport.use(googleStrategy);

app.get("/", async (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
