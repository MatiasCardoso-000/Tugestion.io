import { Request, Response } from "express";
import { CategoryModel } from "../models/category.model";
import { z } from "zod";

// Definimos un tipo para la request que ya pasó por el middleware de auth
declare global {
  namespace Express {
    interface Request {
      user?: { uid: string };
    }
  }
}

// --- Schemas de Zod para Validación ---

const categorySchema = z.object({
  category_name: z
    .string("El nombre de la categoría es requerido.")
    .min(1, "El nombre no puede estar vacío.")
    .max(100, "El nombre no puede exceder los 100 caracteres.")
    .trim(),
});

const createCategory = async (req: Request, res: Response) => {
  try {
    const validationResult = categorySchema.safeParse(req.body);
    if (!validationResult.success) {
      return res
        .status(400)
        .json({ errors: validationResult.error.flatten().fieldErrors });
    }

    const { category_name } = validationResult.data;
    const user_id = req.user!.uid;

    const newCategory = await CategoryModel.create({
      category_name,
      user_id,
    });
    res.status(201).json(newCategory);
  } catch (error: any) {
    // Manejo de error específico para categoría duplicada (error code de PostgreSQL)
    if (error.code === "23505") {
      // 'unique_violation'
      return res
        .status(409)
        .json({ message: "Ya tienes una categoría con ese nombre." });
    }
    console.error("Error en createCategory:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor al crear la categoría." });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const user_id = req.user!.uid;

    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const categories = await CategoryModel.getAll();

    if (!categories) {
      return res.status(404).json({ message: "No existen categorías" });
    }
    res.json(categories);
  } catch (error) {
    console.error("Error en getAllCategories:", error);
    res.status(500).json({ message: "Error al obtener todas las categorías." });
  }
};

/**
 * Obtiene todas las categorías del usuario autenticado.
 */
const getCategoriesByUser = async (req: Request, res: Response) => {
  try {
    const user_id = req.user!.uid;

    const categories = await CategoryModel.findByUser(user_id);

    res.json(categories);
  } catch (error) {
    console.error("Error en getCategoriesByUser:", error);
    res.status(500).json({ message: "Error al obtener las categorías." });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user!.uid;

    const validationResult = categorySchema.safeParse(req.body);
    if (!validationResult.success) {
      return res
        .status(400)
        .json({ errors: validationResult.error.flatten().fieldErrors });
    }

    const { category_name } = validationResult.data;
    console.log(category_name);

    const updatedCategory = await CategoryModel.update({
      category_id: id,
      user_id,
      category_name,
    });

    if (!updatedCategory) {
      return res.status(404).json({
        message:
          "Categoría no encontrada o no tienes permiso para actualizarla.",
      });
    }

    res.json(updatedCategory);
  } catch (error: any) {
    // Manejo de error para nombre duplicado al actualizar
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ message: "Ya tienes otra categoría con ese nombre." });
    }
    console.error("Error en updateCategory:", error);
    res.status(500).json({ message: "Error al actualizar la categoría." });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user!.uid;

    const deletedCategory = await CategoryModel.remove(id, user_id);

    if (!deletedCategory) {
      return res.status(404).json({
        message: "Categoría no encontrada o no tienes permiso para borrarla.",
      });
    }

    // Si la eliminación es exitosa, devolvemos el objeto borrado como confirmación.
    res.json(deletedCategory);
  } catch (error: any) {
    // Manejo de error específico si la categoría está en uso (foreign key violation)
    if (error.code === "23503") {
      // 'foreign_key_violation'
      return res.status(409).json({
        message:
          "No se puede borrar la categoría porque tiene gastos asociados.",
      });
    }
    console.error("Error en deleteCategory:", error);
    res.status(500).json({ message: "Error al eliminar la categoría." });
  }
};

export const CategoryController = {
  createCategory,
  getAllCategories,
  getCategoriesByUser,
  updateCategory,
  deleteCategory,
};
