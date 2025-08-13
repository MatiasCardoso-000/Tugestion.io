"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const generateTokens = (payload) => {
    if (!config_1.ACCESS_TOKEN_SECRET || !config_1.REFRESH_TOKEN_SECRET) {
        throw new Error("Las claves secretas para JWT no están definidas en las variables de entorno.");
    }
    const accessToken = jsonwebtoken_1.default.sign(payload, config_1.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
