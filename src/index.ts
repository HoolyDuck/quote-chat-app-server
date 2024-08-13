import express, { Express, Request, Response } from "express";
import "dotenv/config";

import mongoose from "mongoose";
import passport from "passport";
import { googleStrategy } from "./lib/passport-oauth/passport-oauth";
import { ENV_VARS } from "./common/constants/env-vars";
import cors from "cors";
import cookieParser from "cookie-parser";
import { appRouter } from "./routes/router";
import http from "node:http";
import { Server } from "socket.io";
import { socketService } from "./services";
import { authorizeSocket } from "./lib/socket/authorize-socket";
import { CreateMessageDto } from "./common/types/message/create-message.dto";

const app: Express = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);

mongoose.connect(ENV_VARS.DATABASE_URL!, {});
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("[database]: Connected to database"));

app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ENV_VARS.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.set("trust proxy", 1);

passport.use(googleStrategy);

app.get("/", async (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(appRouter);

const io = new Server(server, {
  cors: {
    origin: ENV_VARS.FRONTEND_URL,
    credentials: true,
  },
});

io.use(authorizeSocket);
io.on("connection", (socket) => {
  console.log("[websocket]: a user connected");

  socket.on("send_message", async ({ createMessageDto, chatId }) => {
    await socketService.sendMessage(socket, createMessageDto, chatId);
  });

  socket.on("disconnect", () => {
    console.log("[websocket]: user disconnected");
  });
});

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(`[websocket]: Websocket is running at ws://localhost:${port}`);
});
