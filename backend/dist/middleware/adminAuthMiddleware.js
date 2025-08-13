"use strict";
'express';
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthMiddleware = void 0;
const user_model_1 = require("../models/user.model");
const adminAuthMiddleware = async (req, res, next) => {
    try {
        const user_id = req.user?.uid;
        if (!user_id) {
            // Esto no debería pasar si authMiddleware se ejecutó primero, pero es una buena defensa.
            return res.status(401).json({ message: 'Usuario no autenticado.' });
        }
        // Consultamos la base de datos para obtener el rol del usuario
        const userResult = await user_model_1.UserModel.findById(user_id);
        if (!userResult) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        const userRole = userResult.role;
        // Verificamos si el rol es 'admin'
        if (userRole !== 'admin') {
            // 403 Forbidden: Estás autenticado, pero no tenés permiso para acceder a este recurso.
            return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
        }
        // Si es admin, ¡adelante!
        next();
    }
    catch (error) {
        res.status(500).json({ message: 'Error interno del servidor al verificar el rol.' });
    }
};
exports.adminAuthMiddleware = adminAuthMiddleware;
