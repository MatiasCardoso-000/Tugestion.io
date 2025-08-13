"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_model_1 = require("../models/category.model");
const zod_1 = require("zod");
// --- Schemas de Zod para Validación ---
const categorySchema = zod_1.z.object({
    category_name: zod_1.z
        .string("El nombre de la categoría es requerido.")
        .min(1, "El nombre no puede estar vacío.")
        .max(100, "El nombre no puede exceder los 100 caracteres.")
        .trim(),
});
const createCategory = async (req, res) => {
    try {
        const validationResult = categorySchema.safeParse(req.body);
        if (!validationResult.success) {
            return res
                .status(400)
                .json({ errors: validationResult.error.flatten().fieldErrors });
        }
        const { category_name } = validationResult.data;
        const user_id = req.user.uid;
        const newCategory = await category_model_1.CategoryModel.create({
            category_name,
            user_id,
        });
        res.status(201).json(newCategory);
    }
    catch (error) {
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
/**
 * @description Obtiene todas las categorías de todos los usuarios. (Ruta de administrador)
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con la lista de todas las categorías.
 */
const getAllCategories = async (req, res) => {
    try {
        const user_id = req.user.uid;
        if (!user_id) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const categories = await category_model_1.CategoryModel.getAll();
        if (!categories) {
            return res.status(404).json({ message: "No existen categorías" });
        }
        res.json(categories);
    }
    catch (error) {
        console.error("Error en getAllCategories:", error);
        res.status(500).json({ message: "Error al obtener todas las categorías." });
    }
};
/**
 * @description Obtiene todas las categorías del usuario autenticado.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con la lista de categorías del usuario.
 */
const getCategoriesByUser = async (req, res) => {
    try {
        const user_id = req.user.uid;
        const categories = await category_model_1.CategoryModel.findByUser(user_id);
        res.json(categories);
    }
    catch (error) {
        console.error("Error en getCategoriesByUser:", error);
        res.status(500).json({ message: "Error al obtener las categorías." });
    }
};
/**
 * @description Actualiza una categoría existente del usuario autenticado.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con la categoría actualizada.
 */
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.uid;
        const validationResult = categorySchema.safeParse(req.body);
        if (!validationResult.success) {
            return res
                .status(400)
                .json({ errors: validationResult.error.flatten().fieldErrors });
        }
        const { category_name } = validationResult.data;
        console.log(category_name);
        const updatedCategory = await category_model_1.CategoryModel.update({
            category_id: id,
            user_id,
            category_name,
        });
        if (!updatedCategory) {
            return res.status(404).json({
                message: "Categoría no encontrada o no tienes permiso para actualizarla.",
            });
        }
        res.json(updatedCategory);
    }
    catch (error) {
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
/**
 * @description Elimina una categoría del usuario autenticado.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con la categoría eliminada.
 */
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.uid;
        const deletedCategory = await category_model_1.CategoryModel.remove(id, user_id);
        if (!deletedCategory) {
            return res.status(404).json({
                message: "Categoría no encontrada o no tienes permiso para borrarla.",
            });
        }
        // Si la eliminación es exitosa, devolvemos el objeto borrado como confirmación.
        res.json(deletedCategory);
    }
    catch (error) {
        // Manejo de error específico si la categoría está en uso (foreign key violation)
        if (error.code === "23503") {
            // 'foreign_key_violation'
            return res.status(409).json({
                message: "No se puede borrar la categoría porque tiene gastos asociados.",
            });
        }
        console.error("Error en deleteCategory:", error);
        res.status(500).json({ message: "Error al eliminar la categoría." });
    }
};
exports.CategoryController = {
    createCategory,
    getAllCategories,
    getCategoriesByUser,
    updateCategory,
    deleteCategory,
};
