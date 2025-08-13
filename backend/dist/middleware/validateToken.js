"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const validateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "Acceso denegado. No se proveyó un token." });
    }
    const token = authHeader.split(" ")[1];
    try {
        if (!config_1.ACCESS_TOKEN_SECRET) {
            throw new Error("La clave secreta para el Access Token no está definida.");
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.ACCESS_TOKEN_SECRET);
        // 5. Si el token es válido, adjuntamos el payload del usuario a la petición
        req.user = { uid: decoded.uid };
        next();
    }
    catch (error) {
        // Si el token no es válido (expirado, malformado, etc.)
        res.status(401).json({ message: "Token inválido o expirado." });
    }
};
exports.validateToken = validateToken;
