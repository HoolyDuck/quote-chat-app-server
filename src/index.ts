import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL || "");
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("[database]: Connected to database"));

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
