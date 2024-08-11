import jwt from "jsonwebtoken";
import { ENV_VARS } from "../constants/env-vars";

type AccessTokenPayload = {
  id: string;
};

type RefreshTokenPayload = {
  id: string;
};

const getTokens = (id: string) => {
  const refreshToken = jwt.sign({ id }, ENV_VARS.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
  const accessToken = jwt.sign({ id }, ENV_VARS.ACCESS_TOKEN_SECRET!, {
    expiresIn: "1h",
  });

  return { refreshToken, accessToken };
};

const checkAccessToken = (token: string) => {
  try {
    return <AccessTokenPayload>jwt.verify(token, ENV_VARS.ACCESS_TOKEN_SECRET!);
  } catch (error) {
    return null;
  }
};

const checkRefreshToken = (token: string) => {
  try {
    return <RefreshTokenPayload>(
      jwt.verify(token, ENV_VARS.REFRESH_TOKEN_SECRET!)
    );
  } catch (error) {
    return null;
  }
};

export { getTokens, checkAccessToken, checkRefreshToken };
