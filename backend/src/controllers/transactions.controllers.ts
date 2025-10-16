
import { Request, Response } from "express";
import { TransactionsModel } from "../models/transactions.model";
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

const createTransactionSchema = z.object({
  amount: z.string(),
  category_id: z.string().optional(),
  description: z
    .string()
    .min(1, "La descripción es requerida.")
    .max(255)
    .optional(),
  date: z.string().datetime().optional(), // Fecha como string ISO 8601, opcional
  transaction_type: z.enum(["gasto", "ingreso"]),
});

const updateTransactionSchema = z.object({
  amount: z.string(),
  category_id: z.string(),
  description: z.string().min(1).max(255).optional(),
  date: z.string().datetime().optional(),
});

const registerTransaction = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const validationResult = createTransactionSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res
        .status(400)
        .json({ errors: validationResult.error.flatten().fieldErrors });
    }

    const { category_id, amount, description, date, transaction_type } =
      validationResult.data;

    const user_id = req.user?.uid;

    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (transaction_type === "gasto" && !category_id) {
      return res
        .status(400)
        .json({ message: "La categoría es obligatoria para los gastos." });
    }

    // if (category_id) {
    //   const category = await CategoryModel.findById(category_id, user_id);
    //   if (!category) {
    //     return res.status(403).json({
    //       message: "La categoría no existe o no tienes permiso para usarla.",
    //     });
    //   }
    // }

    const newTransaction = await TransactionsModel.create({
      category_id,
      user_id,
      amount,
      description,
      date: date ? new Date(date) : undefined,
      transaction_type,
    });

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error en registerTransaction:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor al registrar el gasto." });
  }
};

const getAllTransactions = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const user_id = req.user?.uid;

    const expenses = await TransactionsModel.find();

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

const getTransactionsByUser = async (req: Request, res: Response) => {
  try {
    const user_id = req.user!.uid;

    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const expenses = await TransactionsModel.findByUser(user_id);

    // findByUser devuelve un array. Si está vacío, no es un error, solo no hay gastos.
    res.json(expenses);
  } catch (error) {
    console.error("Error en getExpensesByUser:", error);
    res.status(500).json({ message: "Error al obtener los gastos." });
  }
};

const getTransactionById = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { transaction_id } = req.params;
    const user_id = req.user!.uid;
    const expense = await TransactionsModel.findById(transaction_id, user_id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.json({ expense });
  } catch (error: any) {
    console.error("Error en getExpenseById:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateTransaction = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { transaction_id } = req.params; 
    const user_id = req.user?.uid;

    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const validationResult = updateTransactionSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res
        .status(400)
        .json({ errors: validationResult.error.flatten().fieldErrors });
    }

    const { amount, category_id, description, date } = validationResult.data;

    const updatedExpense = await TransactionsModel.update({
      transaction_id,
      user_id, // Para el WHERE
      amount,
      category_id,
      description,
      date: date ? new Date(date) : undefined,
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

const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { transaction_id } = req.params;
    const user_id = req.user?.uid;

    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const deletedExpense = await TransactionsModel.remove( transaction_id, user_id);

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

export const TransactionController = {
 registerTransaction,
  getAllTransactions,
  getTransactionsByUser,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
