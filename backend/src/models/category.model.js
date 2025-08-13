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
/**
 * Crea una nueva categoría en la base de datos para un usuario específico.
 * Falla si el usuario ya tiene una categoría con el mismo nombre (debido a la restricción UNIQUE).
 * @param input - Un objeto con 'category_name' y 'user_id'.
 * @returns La categoría recién creada.
 */
var create = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var query, rows;
    var category_name = _b.category_name, user_id = _b.user_id;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                query = {
                    text: "\n      INSERT INTO CATEGORY (category_name,user_id)\n      VALUES ($1,$2)\n      RETURNING *\n    ",
                    values: [category_name, user_id],
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_c.sent()).rows;
                return [2 /*return*/, rows[0]];
        }
    });
}); };
/**
 * Busca una categoría específica por su ID, asegurando que le pertenezca al usuario.
 * @param category_id - El ID de la categoría a buscar.
 * @param user_id - El ID del usuario que realiza la petición.
 * @returns La categoría encontrada o undefined si no existe o no le pertenece al usuario.
 */
var getAll = function () { return __awaiter(void 0, void 0, void 0, function () {
    var query, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = {
                    text: "\n      SELECT * FROM CATEGORY\n      WHERE user_id is NULL\n      ORDER BY category_name ASC\n    ",
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_a.sent()).rows;
                return [2 /*return*/, rows];
        }
    });
}); };
var findById = function (user_id, category_id) { return __awaiter(void 0, void 0, void 0, function () {
    var query, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = {
                    text: "\n      SELECT * FROM CATEGORY\n      WHERE category_id = $1 AND (user_id = $2 OR user_id IS NULL)\n      ORDER BY category_name ASC\n    ",
                    values: [category_id, user_id],
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_a.sent()).rows;
                // Devolvemos la categoría encontrada o undefined si no existe.
                return [2 /*return*/, rows[0]];
        }
    });
}); };
/**
 * Busca y devuelve todas las categorías que le pertenecen a un usuario específico.
 * @param user_id - El ID del usuario del que se quieren obtener las categorías.
 * @returns Una promesa que se resuelve con un array de categorías.
 */
var findByUser = function (user_id) { return __awaiter(void 0, void 0, void 0, function () {
    var query, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = {
                    text: "\n      SELECT * FROM CATEGORY\n      WHERE user_id = $1 OR user_id is NULL\n      ORDER BY category_name ASC\n    ",
                    values: [user_id],
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_a.sent()).rows;
                // Devolvemos el array completo de resultados.
                // Si el usuario no tiene categorías, devolverá un array vacío [].
                return [2 /*return*/, rows];
        }
    });
}); };
/**
 * Actualiza el nombre de una categoría específica, verificando que le pertenezca al usuario.
 * Falla si el nuevo nombre ya existe para ese usuario (debido a la restricción UNIQUE).
 * @param input - Un objeto con 'category_id', 'user_id' y el nuevo 'category_name'.
 * @returns La categoría actualizada o undefined si no se encontró.
 */
var update = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var query, rows;
    var category_id = _b.category_id, user_id = _b.user_id, category_name = _b.category_name;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                query = {
                    text: "\n            UPDATE CATEGORY\n            SET category_name = $1\n            WHERE category_id = $2 AND user_id = $3\n            RETURNING *\n        ",
                    values: [category_name, category_id, user_id],
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_c.sent()).rows;
                return [2 /*return*/, rows[0]];
        }
    });
}); };
/**
 * Elimina una categoría específica, verificando que le pertenezca al usuario.
 * Falla si la categoría tiene gastos asociados (debido a la restricción ON DELETE RESTRICT).
 * @param category_id - El ID de la categoría a eliminar.
 * @param user_id - El ID del usuario propietario.
 * @returns La categoría eliminada o undefined si no se encontró.
 */
var remove = function (category_id, user_id) { return __awaiter(void 0, void 0, void 0, function () {
    var query, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = {
                    text: "\n            DELETE FROM CATEGORY\n            WHERE category_id = $1 AND user_id = $2\n            RETURNING *\n        ",
                    values: [category_id, user_id],
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_a.sent()).rows;
                return [2 /*return*/, rows[0]];
        }
    });
}); };
export var CategoryModel = {
    create: create,
    getAll: getAll,
    findById: findById,
    findByUser: findByUser,
    update: update,
    remove: remove,
};
