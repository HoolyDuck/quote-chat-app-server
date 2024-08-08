import { Strategy } from "passport-google-oauth20";
import { ENV_VARS } from "../../common/constants/env-vars";
import { userService } from "../../services";

type Payload = {
  sub: string;
  name: string;
  picture: string;
};

const googleStrategy = new Strategy(
  {
    clientID: ENV_VARS.GOOGLE_CLIENT_ID!,
    clientSecret: ENV_VARS.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${ENV_VARS.API_URL}/auth/google/callback`,
  },
  async (_accessToken, _refreshToken, profile, done) => {
    const { sub, name, picture } = <Payload>profile._json;

    const dbUser = await userService.getUserByGoogleId(sub);
    if (!dbUser) {
      const newUser = await userService.createUser({
        googleId: sub,
        name,
        avatar: picture,
      });
      return done(null, newUser);
    }

    return done(null, dbUser);
  }
);

export { googleStrategy };
