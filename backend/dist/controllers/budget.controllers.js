"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetController = void 0;
const budget_model_1 = require("../models/budget.model");
const setBudget = async (req, res) => {
    try {
        const user_id = req.user.uid;
        const { amount, category_id, month, year } = req.body;
        if (!user_id) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const newBudget = await budget_model_1.BudgetModel.createBudget(user_id, category_id, amount, month, year);
        return res.status(200).json(newBudget);
    }
    catch (error) {
        console.error("Error setting budget:", error);
        if (error.code === "23505") {
            // Código de PostgreSQL para 'unique_violation'
            return res.status(409).json({
                message: "Ya existe un presupuesto para esa categoría en este período.",
            });
        }
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};
const getBudget = async (req, res) => {
    try {
        const userId = req.user.uid;
        let { month, year } = req.query;
        if (!userId) {
            return res.status(401).json({ message: "Usuario no autenticado." });
        }
        const budget = await budget_model_1.BudgetModel.findByUserAndMonth(userId, String(month), String(year));
        if (!budget) {
            return res.status(404).json({ message: "Presupuesto no encontrado." });
        }
        return res.status(200).json(budget);
    }
    catch (error) {
        console.error("Error getting budget:", error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};
exports.budgetController = {
    setBudget,
    getBudget,
};
