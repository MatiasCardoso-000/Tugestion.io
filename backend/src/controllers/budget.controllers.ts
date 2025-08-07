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

/**
 * @description Establece o actualiza el presupuesto para un usuario.
 * Si el usuario ya tiene un presupuesto, lo actualiza.
 * Si no, crea un nuevo presupuesto.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con el presupuesto creado o actualizado.
 */
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
    } else {
      budget = await BudgetModel.addBudget(user_id, amount, period);
    }
    return res.status(200).json(budget);
  } catch (error) {
    console.error("Error setting budget:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

/**
 * @description Obtiene el presupuesto del usuario autenticado.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con el presupuesto del usuario.
 */
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
