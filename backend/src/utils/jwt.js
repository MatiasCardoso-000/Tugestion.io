import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/config";
export var generateTokens = function (payload) {
    if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
        throw new Error("Las claves secretas para JWT no están definidas en las variables de entorno.");
    }
    var accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
    var refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
    return { accessToken: accessToken, refreshToken: refreshToken };
};
