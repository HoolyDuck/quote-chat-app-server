import { DbUser } from "../../common/types/user/db-user.type";
import { getTokens } from "../../common/utils/auth-tokens.utils";
import { CookieOptions, Request, Response } from "express";

const cookieSettings: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

class OauthController {
  async login(req: Request, res: Response) {
    const { _id } = <DbUser>req.user;

    const { accessToken, refreshToken } = getTokens(_id.toString());

    res.cookie("accessToken", accessToken, cookieSettings);
    res.cookie("refreshToken", refreshToken, cookieSettings);

    res.redirect("http://localhost:3000");
  }
}

export { OauthController };
