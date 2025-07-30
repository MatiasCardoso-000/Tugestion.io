import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateTokens } from "../utils/jwt";
import { TokenBlackListModel } from "../models/revokedToken.model";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/config";

interface TokenPayload {
  uid: string;
}

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const password_hash = await bcrypt.hash(password, 12);

    const user = await UserModel.findByEmailForAuth(email);

    if (user) {
      return res
        .status(400)
        .json({ emailInUse: ["El correo electrónico esta en uso."] });
    }

    const newUser = await UserModel.create({ username, email, password_hash });

    const { accessToken, refreshToken } = generateTokens({
      uid: newUser.user_id,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ accessToken });
  } catch (error: any) {
    console.error("Error en el registro de usuario:", error);
    res.status(500).json({ message: ["Error interno del servidor."] });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userFound = await UserModel.findByEmailForAuth(email);

    if (!userFound) {
      return res.status(400).json({ message: ["Invalid credentials"] });
    }

    const checkPassword = await bcrypt.compare(
      password,
      userFound.password_hash
    );
    if (!checkPassword) {
      return res.status(400).json({ message: ["Invalid credentials"] });
    }

    const { accessToken, refreshToken } = generateTokens({
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
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    const userFound = await UserModel.findById(uid);

    if (!userFound) {
      res.status(404).json({ message: [] });
      return;
    }

    res.json(userFound);
  } catch (error: any) {
    res.status(500).json({ message: [error.message] });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      await TokenBlackListModel.add(refreshToken);
    }
    res.clearCookie("refreshToken");
    res.status(200).json("User logged out succesfully");
  } catch (error) {
    console.error("Error en el logout:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
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
    const isRevoked = await TokenBlackListModel.find(refreshToken);
    if (isRevoked) {
      return res
        .status(403)
        .json({ message: "Token inválido o sesión cerrada." });
    }

    // 3. VERIFICAR LA VALIDEZ DEL REFRESH TOKEN
    // Usamos la clave secreta del refresh token para verificarlo.
    if (!REFRESH_TOKEN_SECRET) {
      throw new Error(
        "La clave secreta para el Refresh Token no está definida."
      );
    }

    const decodedPayload = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET
    ) as TokenPayload;

    const user = await UserModel.findById(decodedPayload.uid);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // 4. SI ES VÁLIDO, GENERAR UN NUEVO ACCESS TOKEN
    // Creamos un nuevo accessToken con el payload del usuario y una vida corta.
    if (!ACCESS_TOKEN_SECRET) {
      throw new Error(
        "La clave secreta para el Access Token no está definida."
      );
    }

    const newAccessToken = jwt.sign(
      { uid: decodedPayload.uid }, // Usamos el uid del token verificado
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" } // Nueva vida de 15 minutos
    );

    // 5. ENVIAR EL NUEVO ACCESS TOKEN AL CLIENTE
    res.json({ user, accessToken: newAccessToken });
  } catch (error) {
    // Este catch se activará si jwt.verify falla (token expirado, malformado, etc.)
    // o si falta alguna variable de entorno.
    console.error("Error al refrescar el token:", error);
    return res
      .status(403)
      .json({ message: "Token de refresco inválido o expirado." });
  }
};

export const UserController = {
  register,
  login,
  getUser,
  logout,
  refreshTokenController,
};
