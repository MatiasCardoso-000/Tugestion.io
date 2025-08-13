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
import { pool } from "../database/db";
var createBudget = function (user_id, category_id, amount, month, year) { return __awaiter(void 0, void 0, void 0, function () {
    var query, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = {
                    text: "\n    INSERT INTO BUDGETS(user_id, category_id,amount,month,year)\n    VALUES(\n    $1,\n    $2,\n    $3,\n    COALESCE($4, EXTRACT(MONTH FROM NOW())),\n    COALESCE($5, EXTRACT(YEAR FROM NOW()))\n  )\n    RETURNING *\n    ",
                    values: [user_id, category_id, amount, month, year],
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_a.sent()).rows;
                return [2 /*return*/, rows[0]];
        }
    });
}); };
var findByUserAndMonth = function (user_id, month, year) { return __awaiter(void 0, void 0, void 0, function () {
    var query, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = {
                    text: "\n  SELECT * FROM BUDGETS WHERE user_id = $1 AND month = $2 AND year = $3\n  ",
                    values: [user_id, month, year],
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_a.sent()).rows;
                return [2 /*return*/, rows[0]];
        }
    });
}); };
var updateBudget = function (amount, month, year, budget_id) { return __awaiter(void 0, void 0, void 0, function () {
    var query, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = {
                    text: "\n    UPDATE BUDGETS\n    SET amount = $1, month = $2 , year = $3\n    WHERE budget_id = $4\n    RETURNING *\n    ",
                    values: [amount, month, year, budget_id],
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_a.sent()).rows;
                return [2 /*return*/, rows[0]];
        }
    });
}); };
var deleteBudget = function (user_id) { return __awaiter(void 0, void 0, void 0, function () {
    var query, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = {
                    text: "\n    DELETE FROM BUDGET\n    WHERE user_id = $1\n    RETURNING *\n    ",
                    values: [user_id],
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_a.sent()).rows;
                return [2 /*return*/, rows[0]];
        }
    });
}); };
export var BudgetModel = {
    createBudget: createBudget,
    findByUserAndMonth: findByUserAndMonth,
    updateBudget: updateBudget,
    deleteBudget: deleteBudget,
};
