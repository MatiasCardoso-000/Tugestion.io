import { Request, Response } from "express";
import { ExpensesModel } from "../models/expenses.model";
import { CategoryModel } from "../models/category.model";
import { UserModel } from "../models/user.model";
import { z } from "zod";
declare global {
  namespace Express {
    interface Request {
      user?: { uid: string };
    }
  }
}

const createExpenseSchema = z.object({
  amount: z.string(),
  category_id: z.string(),
  description: z.string().min(1, "La descripción es requerida.").max(255),
  expense_date: z.string().datetime().optional(), // Fecha como string ISO 8601, opcional
});

const updateExpenseSchema = z.object({
  amount: z.string(),
  category_id: z.string(),
  description: z.string().min(1).max(255).optional(),
  expense_date: z.string().datetime().optional(),
});

const registerExpense = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const validationResult = createExpenseSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res
        .status(400)
        .json({ errors: validationResult.error.flatten().fieldErrors });
    }

    const { category_id, amount, description, expense_date } =
      validationResult.data;

    const user_id = req.user?.uid;

    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const category = await CategoryModel.findById(category_id, user_id);

    if (!category) {
      return res.status(403).json({
        message: "La categoría no existe o no tienes permiso para usarla.",
      });
    }

    const newExpense = await ExpensesModel.create({
      category_id,
      user_id,
      amount,
      description,
      expense_date: expense_date ? new Date(expense_date) : undefined,
    });

    res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error en registerExpense:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor al registrar el gasto." });
  }
};

const getAllExpenses = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const user_id = req.user?.uid;

    const expenses = await ExpensesModel.find();

    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await UserModel.findById(user_id);

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
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getExpensesByUser = async (req: Request, res: Response) => {
  try {
    const user_id = req.user!.uid;

    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const expenses = await ExpensesModel.findByUser(user_id);

    // findByUser devuelve un array. Si está vacío, no es un error, solo no hay gastos.
    res.json(expenses);
  } catch (error) {
    console.error("Error en getExpensesByUser:", error);
    res.status(500).json({ message: "Error al obtener los gastos." });
  }
};

const getExpenseById = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { id } = req.params;
    const user_id = req.user!.uid;
    const expense = await ExpensesModel.findById(id, user_id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.json({ expense });
  } catch (error: any) {
    console.error("Error en getExpenseById:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateExpense = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
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

    const { amount, category_id, description, expense_date } =
      validationResult.data;

    const updatedExpense = await ExpensesModel.update({
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
  } catch (error: any) {
    console.error("Error at updateExpense:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.uid;

    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const deletedExpense = await ExpensesModel.remove(id, user_id);

    if (!deletedExpense) {
      return res.status(404).json({
        message: "Gasto no encontrado o no tienes permiso para borrarlo.",
      });
    }

    // Devolvemos el gasto borrado como confirmación.
    res.json(deletedExpense);
  } catch (error) {
    console.error("Error en deleteExpense:", error);
    res.status(500).json({ message: "Error al borrar el gasto." });
  }
};

export const ExpensesController = {
  registerExpense,
  getAllExpenses,
  getExpensesByUser,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
