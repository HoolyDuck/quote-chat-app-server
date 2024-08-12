import { Router } from "express";
import passport from "passport";
import { authController } from "../../controllers";
import { ENV_VARS } from "../../common/constants/env-vars";
import { privateRouteMiddleware } from "../../middlewares/auth/private-route.middleware";

const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"], session: false })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${ENV_VARS.FRONTEND_URL}/login`,
    session: false,
  }),
  authController.login
);

authRouter.post("/refresh", authController.refresh);
authRouter.get("/profile", privateRouteMiddleware, authController.getProfile);

authRouter.get("/test", authController.test);

export { authRouter };
