import { Router } from "express";
import passport from "passport";
import { oauthController } from "../../controllers";

const oauthRouter = Router();

oauthRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"], session: false })
);

oauthRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  oauthController.login
);

export { oauthRouter };
