import { RequestHandler } from "express";
import { checkAccessToken } from "../../common/utils/auth-tokens.utils";
import { userService } from "../../services";

const privateRouteMiddleware: RequestHandler = async (req, res, next) => {
  let accessToken = req.cookies["access_token"] || req.headers["authorization"];

  if (!accessToken) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (accessToken.startsWith("Bearer ")) {
    accessToken = accessToken.split("Bearer ")[1];
  }

  const accessPayload = checkAccessToken(accessToken);

  if (!accessPayload) {
    return res.status(403).json({
      message: "Token is invalid",
    });
  }

  const user = await userService.getUserById(accessPayload.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  req.user = user;
  return next();
};

export { privateRouteMiddleware };
