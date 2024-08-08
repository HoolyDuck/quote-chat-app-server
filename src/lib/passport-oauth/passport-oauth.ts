import { Strategy } from "passport-google-oauth20";
import { ENV_VARS } from "../../common/constants/env-vars";

const googleStrategy = new Strategy(
  {
    clientID: ENV_VARS.GOOGLE_CLIENT_ID!,
    clientSecret: ENV_VARS.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${ENV_VARS.API_URL}/auth/google/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    done(null, profile);
  }
);

export { googleStrategy };
