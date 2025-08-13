/**
 * @file Controlador para las operaciones de autenticación y gestión de usuarios.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateTokens } from "../utils/jwt";
import { TokenBlackListModel } from "../models/revokedToken.model";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/config";
/**
 * @description Registra un nuevo usuario en el sistema.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con el nuevo usuario creado y un token de acceso.
 */
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, password_hash, user, newUser, _b, accessToken, refreshToken, registeredUser, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                return [4 /*yield*/, bcrypt.hash(password, 12)];
            case 2:
                password_hash = _c.sent();
                return [4 /*yield*/, UserModel.findByEmailForAuth(email)];
            case 3:
                user = _c.sent();
                if (user) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ emailInUse: ["El correo electrónico esta en uso."] })];
                }
                return [4 /*yield*/, UserModel.create({ username: username, email: email, password_hash: password_hash })];
            case 4:
                newUser = _c.sent();
                _b = generateTokens({
                    uid: newUser.user_id,
                }), accessToken = _b.accessToken, refreshToken = _b.refreshToken;
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                registeredUser = {
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role,
                    user_id: newUser.user_id,
                };
                res.status(201).json({ user: registeredUser, accessToken: accessToken });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _c.sent();
                console.error("Error en el registro de usuario:", error_1);
                res.status(500).json({ message: ["Error interno del servidor."] });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
/**
 * @description Inicia sesión de un usuario existente.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con el usuario logueado y un token de acceso.
 */
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userFound, checkPassword, _b, accessToken, refreshToken, userLogged, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, UserModel.findByEmailForAuth(email)];
            case 2:
                userFound = _c.sent();
                if (!userFound) {
                    return [2 /*return*/, res.status(400).json({ message: ["Invalid credentials"] })];
                }
                return [4 /*yield*/, bcrypt.compare(password, userFound.password_hash)];
            case 3:
                checkPassword = _c.sent();
                if (!checkPassword) {
                    return [2 /*return*/, res.status(400).json({ message: ["Invalid credentials"] })];
                }
                _b = generateTokens({
                    uid: userFound.user_id,
                }), accessToken = _b.accessToken, refreshToken = _b.refreshToken;
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                userLogged = {
                    username: userFound.username,
                    email: userFound.email,
                    role: userFound.role,
                };
                res.json({ user: userLogged, accessToken: accessToken });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _c.sent();
                res.status(500).json({ message: error_2.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
/**
 * @description Obtiene un usuario por su ID.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - No retorna valor.
 */
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, userFound, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                uid = req.params.uid;
                return [4 /*yield*/, UserModel.findById(uid)];
            case 1:
                userFound = _a.sent();
                if (!userFound) {
                    res.status(404).json({ message: [] });
                    return [2 /*return*/];
                }
                res.json(userFound);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ message: [error_3.message] });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @description Cierra la sesión del usuario.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con un mensaje de éxito.
 */
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                refreshToken = req.cookies.refreshToken;
                if (!refreshToken) return [3 /*break*/, 2];
                return [4 /*yield*/, TokenBlackListModel.add(refreshToken)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                res.clearCookie("refreshToken");
                res.status(200).json("User logged out succesfully");
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error("Error en el logout:", error_4);
                res.status(500).json({ message: "Error interno del servidor." });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * @description Refresca el token de acceso de un usuario.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con un nuevo token de acceso.
 */
export var refreshTokenController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, isRevoked, decodedPayload, user, newAccessToken, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                refreshToken = req.cookies.refreshToken;
                if (!refreshToken) {
                    return [2 /*return*/, res.status(401).json({
                            message: "Acceso denegado. No se proveyó un token de refresco.",
                        })];
                }
                return [4 /*yield*/, TokenBlackListModel.find(refreshToken)];
            case 1:
                isRevoked = _a.sent();
                if (isRevoked) {
                    return [2 /*return*/, res
                            .status(403)
                            .json({ message: "Token inválido o sesión cerrada." })];
                }
                // 3. VERIFICAR LA VALIDEZ DEL REFRESH TOKEN
                // Usamos la clave secreta del refresh token para verificarlo.
                if (!REFRESH_TOKEN_SECRET) {
                    throw new Error("La clave secreta para el Refresh Token no está definida.");
                }
                decodedPayload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
                return [4 /*yield*/, UserModel.findById(decodedPayload.uid)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: "Usuario no encontrado." })];
                }
                // 4. SI ES VÁLIDO, GENERAR UN NUEVO ACCESS TOKEN
                // Creamos un nuevo accessToken con el payload del usuario y una vida corta.
                if (!ACCESS_TOKEN_SECRET) {
                    throw new Error("La clave secreta para el Access Token no está definida.");
                }
                newAccessToken = jwt.sign({ uid: decodedPayload.uid }, // Usamos el uid del token verificado
                ACCESS_TOKEN_SECRET, { expiresIn: "15m" } // Nueva vida de 15 minutos
                );
                // 5. ENVIAR EL NUEVO ACCESS TOKEN AL CLIENTE
                res.json({ user: user, accessToken: newAccessToken });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                // Este catch se activará si jwt.verify falla (token expirado, malformado, etc.)
                // o si falta alguna variable de entorno.
                console.error("Error al refrescar el token:", error_5);
                return [2 /*return*/, res
                        .status(403)
                        .json({ message: "Token de refresco inválido o expirado." })];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var UserController = {
    register: register,
    login: login,
    getUser: getUser,
    logout: logout,
    refreshTokenController: refreshTokenController,
};
