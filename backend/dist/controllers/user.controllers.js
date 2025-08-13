"use strict";
/**
 * @file Controlador para las operaciones de autenticación y gestión de usuarios.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.refreshTokenController = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../utils/jwt");
const revokedToken_model_1 = require("../models/revokedToken.model");
const config_1 = require("../config/config");
/**
 * @description Registra un nuevo usuario en el sistema.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con el nuevo usuario creado y un token de acceso.
 */
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const password_hash = await bcrypt_1.default.hash(password, 12);
        const user = await user_model_1.UserModel.findByEmailForAuth(email);
        if (user) {
            return res
                .status(400)
                .json({ emailInUse: ["El correo electrónico esta en uso."] });
        }
        const newUser = await user_model_1.UserModel.create({ username, email, password_hash });
        const { accessToken, refreshToken } = (0, jwt_1.generateTokens)({
            uid: newUser.user_id,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        const registeredUser = {
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
            user_id: newUser.user_id,
        };
        res.status(201).json({ user: registeredUser, accessToken });
    }
    catch (error) {
        console.error("Error en el registro de usuario:", error);
        res.status(500).json({ message: ["Error interno del servidor."] });
    }
};
/**
 * @description Inicia sesión de un usuario existente.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con el usuario logueado y un token de acceso.
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await user_model_1.UserModel.findByEmailForAuth(email);
        if (!userFound) {
            return res.status(400).json({ message: ["Invalid credentials"] });
        }
        const checkPassword = await bcrypt_1.default.compare(password, userFound.password_hash);
        if (!checkPassword) {
            return res.status(400).json({ message: ["Invalid credentials"] });
        }
        const { accessToken, refreshToken } = (0, jwt_1.generateTokens)({
            uid: userFound.user_id,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        const userLogged = {
            username: userFound.username,
            email: userFound.email,
            role: userFound.role,
        };
        res.json({ user: userLogged, accessToken });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
/**
 * @description Obtiene un usuario por su ID.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - No retorna valor.
 */
const getUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const userFound = await user_model_1.UserModel.findById(uid);
        if (!userFound) {
            res.status(404).json({ message: [] });
            return;
        }
        res.json(userFound);
    }
    catch (error) {
        res.status(500).json({ message: [error.message] });
    }
};
/**
 * @description Cierra la sesión del usuario.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con un mensaje de éxito.
 */
const logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (refreshToken) {
            await revokedToken_model_1.TokenBlackListModel.add(refreshToken);
        }
        res.clearCookie("refreshToken");
        res.status(200).json("User logged out succesfully");
    }
    catch (error) {
        console.error("Error en el logout:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};
/**
 * @description Refresca el token de acceso de un usuario.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con un nuevo token de acceso.
 */
const refreshTokenController = async (req, res) => {
    try {
        // 1. OBTENER EL REFRESH TOKEN DE LA COOKIE
        // El navegador envía la cookie httpOnly automáticamente en cada petición.
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(401).json({
                message: "Acceso denegado. No se proveyó un token de refresco.",
            });
        }
        // 2. VERIFICAR SI EL TOKEN HA SIDO REVOCADO (CERRADO SESIÓN)
        // Esta es la comprobación de seguridad que discutimos para el logout.
        const isRevoked = await revokedToken_model_1.TokenBlackListModel.find(refreshToken);
        if (isRevoked) {
            return res
                .status(403)
                .json({ message: "Token inválido o sesión cerrada." });
        }
        // 3. VERIFICAR LA VALIDEZ DEL REFRESH TOKEN
        // Usamos la clave secreta del refresh token para verificarlo.
        if (!config_1.REFRESH_TOKEN_SECRET) {
            throw new Error("La clave secreta para el Refresh Token no está definida.");
        }
        const decodedPayload = jsonwebtoken_1.default.verify(refreshToken, config_1.REFRESH_TOKEN_SECRET);
        const user = await user_model_1.UserModel.findById(decodedPayload.uid);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        // 4. SI ES VÁLIDO, GENERAR UN NUEVO ACCESS TOKEN
        // Creamos un nuevo accessToken con el payload del usuario y una vida corta.
        if (!config_1.ACCESS_TOKEN_SECRET) {
            throw new Error("La clave secreta para el Access Token no está definida.");
        }
        const newAccessToken = jsonwebtoken_1.default.sign({ uid: decodedPayload.uid }, // Usamos el uid del token verificado
        config_1.ACCESS_TOKEN_SECRET, { expiresIn: "15m" } // Nueva vida de 15 minutos
        );
        // 5. ENVIAR EL NUEVO ACCESS TOKEN AL CLIENTE
        res.json({ user, accessToken: newAccessToken });
    }
    catch (error) {
        // Este catch se activará si jwt.verify falla (token expirado, malformado, etc.)
        // o si falta alguna variable de entorno.
        console.error("Error al refrescar el token:", error);
        return res
            .status(403)
            .json({ message: "Token de refresco inválido o expirado." });
    }
};
exports.refreshTokenController = refreshTokenController;
exports.UserController = {
    register,
    login,
    getUser,
    logout,
    refreshTokenController: exports.refreshTokenController,
};
