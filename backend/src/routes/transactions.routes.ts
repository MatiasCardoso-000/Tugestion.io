import { Router } from "express";
import {  TransactionController } from "../controllers/transactions.controllers";
import { validateToken } from "../middleware/validateToken";

export const router = Router()

// --- Rutas para el Usuario Autenticado ---

// POST /api/expenses - Crear un nuevo gasto
router.post('/transaction', validateToken, TransactionController.registerTransaction);

// // GET /api/expenses - Obtener TODOS los gastos DEL USUARIO LOGUEADO
// // ¡Esta es la ruta que faltaba! Llama al controlador 'getExpensesByUser'
router.get('/transaction', validateToken, TransactionController.getTransactionsByUser);

// GET /api/expenses/:transaction_id - Obtener un gasto específico del usuario
router.get('/transaction/:transaction_id', validateToken, TransactionController.getTransactionById);

// PUT /api/expenses/:transaction_id - Actualizar un gasto específico del usuario
router.put('/transaction/:transaction_id', validateToken, TransactionController.updateTransaction);

// DELETE /api/expenses/:transaction_id - Borrar un gasto específico del usuario (ruta corregida)
router.delete('/transaction/:transaction_id', validateToken, TransactionController.deleteTransaction);

