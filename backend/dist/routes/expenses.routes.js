"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const expenses_controllers_1 = require("../controllers/expenses.controllers");
const validateToken_1 = require("../middleware/validateToken");
exports.router = (0, express_1.Router)();
// --- Rutas para el Usuario Autenticado ---
// POST /api/expenses - Crear un nuevo gasto
exports.router.post('/', validateToken_1.validateToken, expenses_controllers_1.ExpensesController.registerExpense);
// // GET /api/expenses - Obtener TODOS los gastos DEL USUARIO LOGUEADO
// // ¡Esta es la ruta que faltaba! Llama al controlador 'getExpensesByUser'
exports.router.get('/', validateToken_1.validateToken, expenses_controllers_1.ExpensesController.getExpensesByUser);
// GET /api/expenses/:id - Obtener un gasto específico del usuario
exports.router.get('/:id', validateToken_1.validateToken, expenses_controllers_1.ExpensesController.getExpenseById);
// PUT /api/expenses/:id - Actualizar un gasto específico del usuario
exports.router.put('/:id', validateToken_1.validateToken, expenses_controllers_1.ExpensesController.updateExpense);
// DELETE /api/expenses/:id - Borrar un gasto específico del usuario (ruta corregida)
exports.router.delete('/:id', validateToken_1.validateToken, expenses_controllers_1.ExpensesController.deleteExpense);
