var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { CategoryModel } from "../models/category.model";
import { z } from "zod";
// --- Schemas de Zod para Validación ---
var categorySchema = z.object({
    category_name: z
        .string("El nombre de la categoría es requerido.")
        .min(1, "El nombre no puede estar vacío.")
        .max(100, "El nombre no puede exceder los 100 caracteres.")
        .trim(),
});
var createCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validationResult, category_name, user_id, newCategory, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                validationResult = categorySchema.safeParse(req.body);
                if (!validationResult.success) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ errors: validationResult.error.flatten().fieldErrors })];
                }
                category_name = validationResult.data.category_name;
                user_id = req.user.uid;
                return [4 /*yield*/, CategoryModel.create({
                        category_name: category_name,
                        user_id: user_id,
                    })];
            case 1:
                newCategory = _a.sent();
                res.status(201).json(newCategory);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                // Manejo de error específico para categoría duplicada (error code de PostgreSQL)
                if (error_1.code === "23505") {
                    // 'unique_violation'
                    return [2 /*return*/, res
                            .status(409)
                            .json({ message: "Ya tienes una categoría con ese nombre." })];
                }
                console.error("Error en createCategory:", error_1);
                res
                    .status(500)
                    .json({ message: "Error en el servidor al crear la categoría." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @description Obtiene todas las categorías de todos los usuarios. (Ruta de administrador)
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con la lista de todas las categorías.
 */
var getAllCategories = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, categories, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user_id = req.user.uid;
                if (!user_id) {
                    return [2 /*return*/, res.status(401).json({ message: "User not authenticated" })];
                }
                return [4 /*yield*/, CategoryModel.getAll()];
            case 1:
                categories = _a.sent();
                if (!categories) {
                    return [2 /*return*/, res.status(404).json({ message: "No existen categorías" })];
                }
                res.json(categories);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Error en getAllCategories:", error_2);
                res.status(500).json({ message: "Error al obtener todas las categorías." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @description Obtiene todas las categorías del usuario autenticado.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con la lista de categorías del usuario.
 */
var getCategoriesByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, categories, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user_id = req.user.uid;
                return [4 /*yield*/, CategoryModel.findByUser(user_id)];
            case 1:
                categories = _a.sent();
                res.json(categories);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error("Error en getCategoriesByUser:", error_3);
                res.status(500).json({ message: "Error al obtener las categorías." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @description Actualiza una categoría existente del usuario autenticado.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con la categoría actualizada.
 */
var updateCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user_id, validationResult, category_name, updatedCategory, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                user_id = req.user.uid;
                validationResult = categorySchema.safeParse(req.body);
                if (!validationResult.success) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ errors: validationResult.error.flatten().fieldErrors })];
                }
                category_name = validationResult.data.category_name;
                console.log(category_name);
                return [4 /*yield*/, CategoryModel.update({
                        category_id: id,
                        user_id: user_id,
                        category_name: category_name,
                    })];
            case 1:
                updatedCategory = _a.sent();
                if (!updatedCategory) {
                    return [2 /*return*/, res.status(404).json({
                            message: "Categoría no encontrada o no tienes permiso para actualizarla.",
                        })];
                }
                res.json(updatedCategory);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                // Manejo de error para nombre duplicado al actualizar
                if (error_4.code === "23505") {
                    return [2 /*return*/, res
                            .status(409)
                            .json({ message: "Ya tienes otra categoría con ese nombre." })];
                }
                console.error("Error en updateCategory:", error_4);
                res.status(500).json({ message: "Error al actualizar la categoría." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @description Elimina una categoría del usuario autenticado.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con la categoría eliminada.
 */
var deleteCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user_id, deletedCategory, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                user_id = req.user.uid;
                return [4 /*yield*/, CategoryModel.remove(id, user_id)];
            case 1:
                deletedCategory = _a.sent();
                if (!deletedCategory) {
                    return [2 /*return*/, res.status(404).json({
                            message: "Categoría no encontrada o no tienes permiso para borrarla.",
                        })];
                }
                // Si la eliminación es exitosa, devolvemos el objeto borrado como confirmación.
                res.json(deletedCategory);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                // Manejo de error específico si la categoría está en uso (foreign key violation)
                if (error_5.code === "23503") {
                    // 'foreign_key_violation'
                    return [2 /*return*/, res.status(409).json({
                            message: "No se puede borrar la categoría porque tiene gastos asociados.",
                        })];
                }
                console.error("Error en deleteCategory:", error_5);
                res.status(500).json({ message: "Error al eliminar la categoría." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var CategoryController = {
    createCategory: createCategory,
    getAllCategories: getAllCategories,
    getCategoriesByUser: getCategoriesByUser,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory,
};
