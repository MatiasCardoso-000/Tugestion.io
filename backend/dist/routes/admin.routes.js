"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const validateToken_1 = require("../middleware/validateToken");
const adminAuthMiddleware_1 = require("../middleware/adminAuthMiddleware");
const expenses_controllers_1 = require("../controllers/expenses.controllers");
exports.router = (0, express_1.Router)();
// --- Rutas solo para Administradores ---
// Se podría crear un archivo separado (admin.routes.ts) o mantenerlo aquí con un prefijo.
// GET /api/admin/expenses - Obtener TODOS los gastos de TODOS los usuarios
exports.router.get("/admin/expenses", validateToken_1.validateToken, adminAuthMiddleware_1.adminAuthMiddleware, expenses_controllers_1.ExpensesController.getAllExpenses // Este es el controlador que trae todo
);
