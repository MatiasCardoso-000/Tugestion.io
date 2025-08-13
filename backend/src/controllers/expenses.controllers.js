/**
 * @file Controlador para las operaciones CRUD de gastos.
 */
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
import { ExpensesModel } from "../models/expenses.model";
import { CategoryModel } from "../models/category.model";
import { UserModel } from "../models/user.model";
import { z } from "zod";
var createExpenseSchema = z.object({
    amount: z.string(),
    category_id: z.string(),
    description: z.string().min(1, "La descripción es requerida.").max(255),
    expense_date: z.string().datetime().optional(), // Fecha como string ISO 8601, opcional
});
var updateExpenseSchema = z.object({
    amount: z.string(),
    category_id: z.string(),
    description: z.string().min(1).max(255).optional(),
    expense_date: z.string().datetime().optional(),
});
/**
 * @description Registra un nuevo gasto para el usuario autenticado.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response | undefined>} - Una promesa que se resuelve con el nuevo gasto creado.
 */
var registerExpense = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validationResult, _a, category_id, amount, description, expense_date, user_id, category, newExpense, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                validationResult = createExpenseSchema.safeParse(req.body);
                if (!validationResult.success) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ errors: validationResult.error.flatten().fieldErrors })];
                }
                _a = validationResult.data, category_id = _a.category_id, amount = _a.amount, description = _a.description, expense_date = _a.expense_date;
                user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.uid;
                if (!user_id) {
                    return [2 /*return*/, res.status(401).json({ message: "User not authenticated" })];
                }
                return [4 /*yield*/, CategoryModel.findById(category_id, user_id)];
            case 1:
                category = _c.sent();
                if (!category) {
                    return [2 /*return*/, res.status(403).json({
                            message: "La categoría no existe o no tienes permiso para usarla.",
                        })];
                }
                return [4 /*yield*/, ExpensesModel.create({
                        category_id: category_id,
                        user_id: user_id,
                        amount: amount,
                        description: description,
                        expense_date: expense_date ? new Date(expense_date) : undefined,
                    })];
            case 2:
                newExpense = _c.sent();
                res.status(201).json(newExpense);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _c.sent();
                console.error("Error en registerExpense:", error_1);
                res
                    .status(500)
                    .json({ message: "Error en el servidor al registrar el gasto." });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * @description Obtiene todos los gastos de todos los usuarios. (Ruta de administrador)
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response | undefined>} - Una promesa que se resuelve con la lista de todos los gastos.
 */
var getAllExpenses = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, expenses, user, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uid;
                return [4 /*yield*/, ExpensesModel.find()];
            case 1:
                expenses = _b.sent();
                if (!user_id) {
                    return [2 /*return*/, res.status(401).json({ message: "User not authenticated" })];
                }
                return [4 /*yield*/, UserModel.findById(user_id)];
            case 2:
                user = _b.sent();
                if (!(user === null || user === void 0 ? void 0 : user.role)) {
                    return [2 /*return*/, res.status(403).json({
                            message: "No existen gastos  o no tienes permiso para acceder a ellos.",
                        })];
                }
                if (!expenses) {
                    return [2 /*return*/, res
                            .status(404)
                            .json({ message: "Error al obtener todos los gastos." })];
                }
                res.json(expenses);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                res.status(500).json({ message: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * @description Obtiene todos los gastos del usuario autenticado.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con la lista de gastos del usuario.
 */
var getExpensesByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, expenses, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user_id = req.user.uid;
                if (!user_id) {
                    return [2 /*return*/, res.status(401).json({ message: "User not authenticated" })];
                }
                return [4 /*yield*/, ExpensesModel.findByUser(user_id)];
            case 1:
                expenses = _a.sent();
                // findByUser devuelve un array. Si está vacío, no es un error, solo no hay gastos.
                res.json(expenses);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error("Error en getExpensesByUser:", error_3);
                res.status(500).json({ message: "Error al obtener los gastos." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @description Obtiene un gasto específico por su ID.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response | undefined>} - Una promesa que se resuelve con el gasto solicitado.
 */
var getExpenseById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user_id, expense, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                user_id = req.user.uid;
                return [4 /*yield*/, ExpensesModel.findById(id, user_id)];
            case 1:
                expense = _a.sent();
                if (!expense) {
                    return [2 /*return*/, res.status(404).json({ message: "Expense not found" })];
                }
                return [2 /*return*/, res.json({ expense: expense })];
            case 2:
                error_4 = _a.sent();
                console.error("Error en getExpenseById:", error_4);
                res.status(500).json({ message: error_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @description Actualiza un gasto existente del usuario autenticado.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response | undefined>} - Una promesa que se resuelve con el gasto actualizado.
 */
var updateExpense = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user_id, validationResult, _a, amount, category_id, description, expense_date, updatedExpense, error_5;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                id = req.params.id;
                user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.uid;
                if (!user_id) {
                    return [2 /*return*/, res.status(401).json({ message: "User not authenticated" })];
                }
                validationResult = updateExpenseSchema.safeParse(req.body);
                if (!validationResult.success) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ errors: validationResult.error.flatten().fieldErrors })];
                }
                _a = validationResult.data, amount = _a.amount, category_id = _a.category_id, description = _a.description, expense_date = _a.expense_date;
                return [4 /*yield*/, ExpensesModel.update({
                        expense_id: id,
                        user_id: user_id, // Para el WHERE
                        amount: amount,
                        category_id: category_id,
                        description: description,
                        expense_date: expense_date ? new Date(expense_date) : undefined,
                    })];
            case 1:
                updatedExpense = _c.sent();
                if (!updatedExpense) {
                    return [2 /*return*/, res.status(404).json({
                            message: "Gasto no encontrado o no tienes permiso para actualizarlo.",
                        })];
                }
                res.json(updatedExpense);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _c.sent();
                console.error("Error at updateExpense:", error_5);
                return [2 /*return*/, res.status(500).json({ message: "Error interno del servidor." })];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @description Elimina un gasto del usuario autenticado.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<Response>} - Una promesa que se resuelve con el gasto eliminado.
 */
var deleteExpense = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user_id, deletedExpense, error_6;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uid;
                if (!user_id) {
                    return [2 /*return*/, res.status(401).json({ message: "User not authenticated" })];
                }
                return [4 /*yield*/, ExpensesModel.remove(id, user_id)];
            case 1:
                deletedExpense = _b.sent();
                if (!deletedExpense) {
                    return [2 /*return*/, res.status(404).json({
                            message: "Gasto no encontrado o no tienes permiso para borrarlo.",
                        })];
                }
                // Devolvemos el gasto borrado como confirmación.
                res.json(deletedExpense);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _b.sent();
                console.error("Error en deleteExpense:", error_6);
                res.status(500).json({ message: "Error al borrar el gasto." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var ExpensesController = {
    registerExpense: registerExpense,
    getAllExpenses: getAllExpenses,
    getExpensesByUser: getExpensesByUser,
    getExpenseById: getExpenseById,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
};
