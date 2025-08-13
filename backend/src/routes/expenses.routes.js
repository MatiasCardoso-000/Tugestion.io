import { Router } from "express";
import { ExpensesController } from "../controllers/expenses.controllers";
import { validateToken } from "../middleware/validateToken";
export var router = Router();
// --- Rutas para el Usuario Autenticado ---
// POST /api/expenses - Crear un nuevo gasto
router.post('/', validateToken, ExpensesController.registerExpense);
// // GET /api/expenses - Obtener TODOS los gastos DEL USUARIO LOGUEADO
// // ¡Esta es la ruta que faltaba! Llama al controlador 'getExpensesByUser'
router.get('/', validateToken, ExpensesController.getExpensesByUser);
// GET /api/expenses/:id - Obtener un gasto específico del usuario
router.get('/:id', validateToken, ExpensesController.getExpenseById);
// PUT /api/expenses/:id - Actualizar un gasto específico del usuario
router.put('/:id', validateToken, ExpensesController.updateExpense);
// DELETE /api/expenses/:id - Borrar un gasto específico del usuario (ruta corregida)
router.delete('/:id', validateToken, ExpensesController.deleteExpense);
