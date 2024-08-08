import { Router } from "express";
import passport from "passport";
import { authController } from "../../controllers";

const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"], session: false })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  authController.login
);

authRouter.post("/refresh", authController.refresh);

export { authRouter };
