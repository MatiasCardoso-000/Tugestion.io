import { Router } from "express";
import { validateToken } from "../middleware/validateToken";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";
import { ExpensesController } from "../controllers/expenses.controllers";

export const router = Router();

// --- Rutas solo para Administradores ---
// Se podría crear un archivo separado (admin.routes.ts) o mantenerlo aquí con un prefijo.

// GET /api/admin/expenses - Obtener TODOS los gastos de TODOS los usuarios
router.get(
  "/admin/expenses",
  validateToken,
  adminAuthMiddleware,
  ExpensesController.getAllExpenses // Este es el controlador que trae todo
);
