import { Router } from "express";
import passport from "passport";
import { authController } from "../controllers";

const oauthRouter = Router();

oauthRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"], session: false })
);

oauthRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  authController.login
);

export { oauthRouter };
