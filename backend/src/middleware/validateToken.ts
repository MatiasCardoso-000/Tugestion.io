import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/config";

// Extiende la interfaz Request para incluir la propiedad 'user'
declare module 'express-serve-static-core' {
  namespace Express {
    interface Request {
      user?: { uid: string };
    }
  }
}


export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. No se proveyó un token." });
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!ACCESS_TOKEN_SECRET) {
      throw new Error(
        "La clave secreta para el Access Token no está definida."
      );
    }
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as { uid: string };

    // 5. Si el token es válido, adjuntamos el payload del usuario a la petición
    req.user = { uid: decoded.uid };
    next()
  } catch (error) {
    // Si el token no es válido (expirado, malformado, etc.)
    res.status(401).json({ message: "Token inválido o expirado." });
  }
};
