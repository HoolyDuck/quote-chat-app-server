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

    res.cookie("access_token", accessToken, cookieSettings);
    res.cookie("refresh_token", refreshToken, cookieSettings);

    res.redirect(`${ENV_VARS.FRONTEND_URL}/`);
  }

  async test(req: Request, res: Response) {
    res.cookie("test", "test", cookieSettings);
    res.json({ message: "Test cookie set" });
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

    res.cookie("access_token", accessToken, cookieSettings);
    res.cookie("refresh_token", newRefreshToken, cookieSettings);

    res.status(200).json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  }

  async getProfile(req: Request, res: Response) {
    res.json(req.user);
  }
}

export { AuthController };
