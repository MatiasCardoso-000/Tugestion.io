"use strict";
/**
 * @file Controlador para las operaciones CRUD de gastos.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesController = void 0;
const expenses_model_1 = require("../models/expenses.model");
const category_model_1 = require("../models/category.model");
const user_model_1 = require("../models/user.model");
const zod_1 = require("zod");
const createExpenseSchema = zod_1.z.object({
    amount: zod_1.z.string(),
    category_id: zod_1.z.string(),
    description: zod_1.z.string().min(1, "La descripción es requerida.").max(255),
    expense_date: zod_1.z.string().datetime().optional(), // Fecha como string ISO 8601, opcional
});
const updateExpenseSchema = zod_1.z.object({
    amount: zod_1.z.string(),
    category_id: zod_1.z.string(),
    description: zod_1.z.string().min(1).max(255).optional(),
    expense_date: zod_1.z.string().datetime().optional(),
});
/**
 * @description Registra un nuevo gasto para el usuario autenticado.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response | undefined>} - Una promesa que se resuelve con el nuevo gasto creado.
 */
const registerExpense = async (req, res) => {
    try {
        const validationResult = createExpenseSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res
                .status(400)
                .json({ errors: validationResult.error.flatten().fieldErrors });
        }
        const { category_id, amount, description, expense_date } = validationResult.data;
        const user_id = req.user?.uid;
        if (!user_id) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const category = await category_model_1.CategoryModel.findById(category_id, user_id);
        if (!category) {
            return res.status(403).json({
                message: "La categoría no existe o no tienes permiso para usarla.",
            });
        }
        const newExpense = await expenses_model_1.ExpensesModel.create({
            category_id,
            user_id,
            amount,
            description,
            expense_date: expense_date ? new Date(expense_date) : undefined,
        });
        res.status(201).json(newExpense);
    }
    catch (error) {
        console.error("Error en registerExpense:", error);
        res
            .status(500)
            .json({ message: "Error en el servidor al registrar el gasto." });
    }
};
/**
 * @description Obtiene todos los gastos de todos los usuarios. (Ruta de administrador)
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response | undefined>} - Una promesa que se resuelve con la lista de todos los gastos.
 */
const getAllExpenses = async (req, res) => {
    try {
        const user_id = req.user?.uid;
        const expenses = await expenses_model_1.ExpensesModel.find();
        if (!user_id) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const user = await user_model_1.UserModel.findById(user_id);
        if (!user?.role) {
            return res.status(403).json({
                message: "No existen gastos  o no tienes permiso para acceder a ellos.",
            });
        }
        if (!expenses) {
            return res
                .status(404)
                .json({ message: "Error al obtener todos los gastos." });
        }
        res.json(expenses);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
/**
 * @description Obtiene todos los gastos del usuario autenticado.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con la lista de gastos del usuario.
 */
const getExpensesByUser = async (req, res) => {
    try {
        const user_id = req.user.uid;
        if (!user_id) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const expenses = await expenses_model_1.ExpensesModel.findByUser(user_id);
        // findByUser devuelve un array. Si está vacío, no es un error, solo no hay gastos.
        res.json(expenses);
    }
    catch (error) {
        console.error("Error en getExpensesByUser:", error);
        res.status(500).json({ message: "Error al obtener los gastos." });
    }
};
/**
 * @description Obtiene un gasto específico por su ID.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response | undefined>} - Una promesa que se resuelve con el gasto solicitado.
 */
const getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.uid;
        const expense = await expenses_model_1.ExpensesModel.findById(id, user_id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        return res.json({ expense });
    }
    catch (error) {
        console.error("Error en getExpenseById:", error);
        res.status(500).json({ message: error.message });
    }
};
/**
 * @description Actualiza un gasto existente del usuario autenticado.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response | undefined>} - Una promesa que se resuelve con el gasto actualizado.
 */
const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user?.uid;
        if (!user_id) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const validationResult = updateExpenseSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res
                .status(400)
                .json({ errors: validationResult.error.flatten().fieldErrors });
        }
        const { amount, category_id, description, expense_date } = validationResult.data;
        const updatedExpense = await expenses_model_1.ExpensesModel.update({
            expense_id: id,
            user_id, // Para el WHERE
            amount,
            category_id,
            description,
            expense_date: expense_date ? new Date(expense_date) : undefined,
        });
        if (!updatedExpense) {
            return res.status(404).json({
                message: "Gasto no encontrado o no tienes permiso para actualizarlo.",
            });
        }
        res.json(updatedExpense);
    }
    catch (error) {
        console.error("Error at updateExpense:", error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};
/**
 * @description Elimina un gasto del usuario autenticado.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con el gasto eliminado.
 */
const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user?.uid;
        if (!user_id) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const deletedExpense = await expenses_model_1.ExpensesModel.remove(id, user_id);
        if (!deletedExpense) {
            return res.status(404).json({
                message: "Gasto no encontrado o no tienes permiso para borrarlo.",
            });
        }
        // Devolvemos el gasto borrado como confirmación.
        res.json(deletedExpense);
    }
    catch (error) {
        console.error("Error en deleteExpense:", error);
        res.status(500).json({ message: "Error al borrar el gasto." });
    }
};
exports.ExpensesController = {
    registerExpense,
    getAllExpenses,
    getExpensesByUser,
    getExpenseById,
    updateExpense,
    deleteExpense,
};
