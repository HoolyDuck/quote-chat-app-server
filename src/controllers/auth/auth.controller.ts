import { ENV_VARS } from "../../common/constants/env-vars";
import { DbUser } from "../../common/types/user/db-user.type";
import {
  checkRefreshToken,
  getTokens,
} from "../../common/utils/auth-tokens.utils";
import { CookieOptions, Request, Response } from "express";

const cookieSettings: CookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: process.env.NODE_ENV === "production",
  domain: process.env.NODE_ENV === "production" ? ENV_VARS.COOKIE_DOMAIN : "",
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

class AuthController {
  async login(req: Request, res: Response) {
    const { _id } = <DbUser>req.user;

    const { accessToken, refreshToken } = getTokens(_id.toString());

    // clear cookies
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res.cookie("access_token", accessToken, cookieSettings);
    res.cookie("refresh_token", refreshToken, cookieSettings);

    res.redirect(`${ENV_VARS.FRONTEND_URL}/chat`);
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies["refresh_token"];

    const refreshPayload = checkRefreshToken(refreshToken);

    if (!refreshPayload) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { id } = refreshPayload;
    const { accessToken, refreshToken: newRefreshToken } = getTokens(id);

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res.cookie("access_token", accessToken, cookieSettings);
    res.cookie("refresh_token", newRefreshToken, cookieSettings);

    res.status(200).json({
      message: "Refreshed",
    });
  }

  async getProfile(req: Request, res: Response) {
    res.json(req.user);
  }

  async logout(req: Request, res: Response) {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res.status(200).json({
      message: "Logged out",
    });
  }
}

export { AuthController };
