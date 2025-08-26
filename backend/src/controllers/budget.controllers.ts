import { Request, Response } from "express";
import { BudgetModel } from "../models/budget.model";

declare global {
  namespace Express {
    interface Request {
      user?: { uid: string };
    }
  }
}

const setBudget = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user_id = req.user!.uid;
    const { amount, category_id, month, year } = req.body;

    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const newBudget = await BudgetModel.createBudget(
      user_id,
      category_id,
      amount,
      month,
      year
    );

    return res.status(200).json(newBudget);
  } catch (error: any) {
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

const getBudget = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user!.uid;

    let { month, year } = req.query;

    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado." });
    }

    const budget = await BudgetModel.findByUserAndMonth(
      userId,
      String(month),
      String(year)
    );

    if (!budget) {
      return res.status(404).json({ message: "Presupuesto no encontrado." });
    }

    return res.status(200).json(budget);
  } catch (error) {
    console.error("Error getting budget:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

const getAllBudgets = async (req: Request, res: Response) => {
  try {
    const budgets = await BudgetModel.getAll();
    if (!budgets) {
      return res.status(400).json({ message: "Budgets are not avalaible" });
    }
    res.json(budgets);
  } catch (error) {
    console.log(error);
  }
};

const updateBudget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { amount, month, year } = req.body;

    const budget = await BudgetModel.findById(id);
    if (!budget) {
      return res.status(404).json({ message: "Budget doesn't exists" });
    }

    const updatedBudget = await BudgetModel.updateBudget(
      amount,
      month,
      year,
      id
    );
    res.json(updatedBudget);
  } catch (error) {
    console.log(error);
  }
};

const deleteBudget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const budget = await BudgetModel.findById(id);
    if (!budget) {
      return res.status(404).json({ message: "Budget doesn't exists" });
    }

    await BudgetModel.deleteBudget(budget.budget_id);
  } catch (error) {
    console.log(error);
  }
};

export const budgetController = {
  setBudget,
  getAllBudgets,
  getBudget,
  updateBudget,
  deleteBudget,
};
