import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/config";

interface TokenPayload {
  uid: string;
}

export const generateTokens = (payload: TokenPayload) => {
  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error(
      "Las claves secretas para JWT no están definidas en las variables de entorno."
    );
  }

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return {accessToken,refreshToken}
};
