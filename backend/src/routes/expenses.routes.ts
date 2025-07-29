import { Router } from "express";
import { ExpensesController } from "../controllers/expenses.controllers";
import { validateToken } from "../middleware/validateToken";

export const router = Router()


// --- Rutas para el Usuario Autenticado ---

// POST /api/expenses - Crear un nuevo gasto
router.post('/expenses', validateToken, ExpensesController.registerExpense);

// // GET /api/expenses - Obtener TODOS los gastos DEL USUARIO LOGUEADO
// // ¡Esta es la ruta que faltaba! Llama al controlador 'getExpensesByUser'
router.get('/expenses', validateToken, ExpensesController.getExpensesByUser);

// GET /api/expenses/:id - Obtener un gasto específico del usuario
router.get('/expenses/:id', validateToken, ExpensesController.getExpenseById);

// PUT /api/expenses/:id - Actualizar un gasto específico del usuario
router.put('/expenses/:id', validateToken, ExpensesController.updateExpense);

// DELETE /api/expenses/:id - Borrar un gasto específico del usuario (ruta corregida)
router.delete('/expenses/:id', validateToken, ExpensesController.deleteExpense);

