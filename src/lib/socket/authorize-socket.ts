import { Socket } from "socket.io";
import cookie from "cookie";
import { checkAccessToken } from "../../common/utils/auth-tokens.utils";
import { ExtendedError } from "socket.io/dist/namespace";
import { userService } from "../../services";

const authorizeSocket = async (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  const handshakeCookies = socket.handshake.headers.cookie;
  console.log(handshakeCookies);
  if (!handshakeCookies) {
    return next(new Error("Unauthorized"));
  }

  const { access_token } = <{ access_token: string }>(
    cookie.parse(handshakeCookies)
  );

  if (!access_token) {
    return next(new Error("Unauthorized"));
  }

  const user = checkAccessToken(access_token);

  if (!user) {
    return next(new Error("Token is invalid"));
  }

  const dbUser = await userService.getUserById(user.id);

  if (!dbUser) {
    return next(new Error("User not found"));
  }

  socket.data.user = dbUser;

  return next();
};

export { authorizeSocket };
