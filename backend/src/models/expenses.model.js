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
var create = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var query, rows;
    var category_id = _b.category_id, user_id = _b.user_id, amount = _b.amount, description = _b.description, expense_date = _b.expense_date;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                query = {
                    text: "\n    INSERT INTO EXPENSES(category_id, user_id, amount, description, expense_date)\n      VALUES($1, $2, $3, $4, COALESCE($5,CURRENT_DATE))\n      RETURNING *\n    ",
                    values: [category_id, user_id, amount, description, expense_date],
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_c.sent()).rows;
                return [2 /*return*/, rows[0]];
        }
    });
}); };
var find = function () { return __awaiter(void 0, void 0, void 0, function () {
    var query, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = {
                    text: "\n    SELECT * FROM EXPENSES\n    ",
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_a.sent()).rows;
                return [2 /*return*/, rows];
        }
    });
}); };
var findById = function (expense_id, user_id) { return __awaiter(void 0, void 0, void 0, function () {
    var query, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = {
                    text: "\n    SELECT * FROM EXPENSES\n   WHERE expense_id = $1 AND user_id = $2\n    ",
                    values: [expense_id, user_id],
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_a.sent()).rows;
                return [2 /*return*/, rows[0]];
        }
    });
}); };
var findByUser = function (user_id) { return __awaiter(void 0, void 0, void 0, function () {
    var query, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = {
                    text: "\n    SELECT * FROM EXPENSES\n   WHERE user_id = $1 \n    ",
                    values: [user_id],
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_a.sent()).rows;
                return [2 /*return*/, rows];
        }
    });
}); };
var update = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var query, rows;
    var expense_id = _b.expense_id, user_id = _b.user_id, amount = _b.amount, category_id = _b.category_id, description = _b.description, expense_date = _b.expense_date;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                query = {
                    text: "\n    UPDATE EXPENSES\n      SET \n        amount = COALESCE($1, amount),\n        description = COALESCE($2, description),\n        category_id = COALESCE($3, category_id),\n        expense_date = COALESCE($4, expense_date)\n      WHERE expense_id = $5 AND user_id = $6\n      RETURNING *\n\n    ",
                    values: [
                        amount,
                        description,
                        category_id,
                        expense_date,
                        expense_id,
                        user_id,
                    ],
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_c.sent()).rows;
                return [2 /*return*/, rows[0]];
        }
    });
}); };
var remove = function (expense_id, user_id) { return __awaiter(void 0, void 0, void 0, function () {
    var query, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = {
                    text: "\n            DELETE FROM EXPENSES\n            WHERE expense_id = $1 AND user_id = $2\n            RETURNING *\n        ",
                    values: [expense_id, user_id],
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_a.sent()).rows;
                return [2 /*return*/, rows[0]];
        }
    });
}); };
export var ExpensesModel = {
    create: create,
    find: find,
    findById: findById,
    findByUser: findByUser,
    update: update,
    remove: remove,
};
