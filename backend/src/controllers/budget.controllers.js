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
import { BudgetModel } from "../models/budget.model";
var setBudget = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, _a, amount, category_id, month, year, newBudget, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                user_id = req.user.uid;
                _a = req.body, amount = _a.amount, category_id = _a.category_id, month = _a.month, year = _a.year;
                if (!user_id) {
                    return [2 /*return*/, res.status(401).json({ message: "User not authenticated" })];
                }
                return [4 /*yield*/, BudgetModel.createBudget(user_id, category_id, amount, month, year)];
            case 1:
                newBudget = _b.sent();
                return [2 /*return*/, res.status(200).json(newBudget)];
            case 2:
                error_1 = _b.sent();
                console.error("Error setting budget:", error_1);
                if (error_1.code === "23505") {
                    // Código de PostgreSQL para 'unique_violation'
                    return [2 /*return*/, res.status(409).json({
                            message: "Ya existe un presupuesto para esa categoría en este período.",
                        })];
                }
                return [2 /*return*/, res.status(500).json({ message: "Error interno del servidor." })];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getBudget = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, month, year, budget, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userId = req.user.uid;
                _a = req.query, month = _a.month, year = _a.year;
                if (!userId) {
                    return [2 /*return*/, res.status(401).json({ message: "Usuario no autenticado." })];
                }
                return [4 /*yield*/, BudgetModel.findByUserAndMonth(userId, month, year)];
            case 1:
                budget = _b.sent();
                if (!budget) {
                    return [2 /*return*/, res.status(404).json({ message: "Presupuesto no encontrado." })];
                }
                return [2 /*return*/, res.status(200).json(budget)];
            case 2:
                error_2 = _b.sent();
                console.error("Error getting budget:", error_2);
                return [2 /*return*/, res.status(500).json({ message: "Error interno del servidor." })];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var budgetController = {
    setBudget: setBudget,
    getBudget: getBudget,
};
