import { Request, Response } from "express";
import { BudgetModel } from "../models/budget.model";
import { get } from "http";

declare global {
  namespace Express {
    interface Request {
      user?: { uid: string };
    }
  }
}

const setBudget = async (req: Request, res: Response) => {
  try {
    const user_id = req.user!.uid;
    const { amount, period } = req.body;

    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const existingBudget = await BudgetModel.getBudgetByUserId(user_id);

    let budget;
    if (existingBudget) {
      budget = await BudgetModel.updateBudget(
        existingBudget.budget_id,
        amount,
        period
      );
    }
    budget = await BudgetModel.addBudget(user_id, amount, period);
    return res.status(200).json(budget);
  } catch (error) {
    console.error("Error setting budget:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

const getBudget = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user!.uid;
    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado." });
    }

    const budget = await BudgetModel.getBudgetByUserId(userId);
    if (!budget) {
      return res.status(404).json({ message: "Presupuesto no encontrado." });
    }

    return res.status(200).json(budget);
  } catch (error) {
    console.error("Error getting budget:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const budgetController = {
  setBudget,
  getBudget,
};
