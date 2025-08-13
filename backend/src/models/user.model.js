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
 * Crea un nuevo usuario en la base de datos.
 * Esta función es segura y no devuelve información sensible.
 *
 * @param {CreateUserInput} input - Un objeto que contiene los datos del nuevo usuario.
 * @param {string} input.username - El nombre de usuario.
 * @param {string} input.email - El correo electrónico del usuario (debe ser único).
 * @param {string} input.password_hash - El hash de la contraseña ya procesado con bcrypt.
 * @returns {Promise<User>} Una promesa que se resuelve con el objeto del usuario recién creado,
 * excluyendo datos sensibles como el hash de la contraseña.
 * @throws {Error} Lanza un error si el correo electrónico ya está en uso (violación de la restricción UNIQUE de la base de datos).
 */
var create = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var query, rows;
    var username = _b.username, email = _b.email, password_hash = _b.password_hash;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                query = {
                    text: "\n    INSERT INTO USERS(username,email,password_hash)\n    VALUES($1,$2,$3)\n    RETURNING username,email, user_id\n    ",
                    values: [username, email, password_hash],
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_c.sent()).rows;
                return [2 /*return*/, rows[0]];
        }
    });
}); };
/**
 * Busca a un usuario por su email para el proceso de autenticación.
 * ¡ADVERTENCIA DE SEGURIDAD! Esta función devuelve el password_hash del usuario.
 * Debe usarse SOLAMENTE para verificar la contraseña durante el login.
 * NUNCA se debe devolver el objeto resultante directamente en una respuesta de API.
 * @param email - El email del usuario a buscar.
 * @returns El objeto completo del usuario (incluyendo hash) o undefined si no se encuentra.
 */
var findByEmailForAuth = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var query, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = {
                    text: "\n      SELECT * FROM USERS\n      WHERE EMAIL = $1\n    ",
                    values: [email],
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_a.sent()).rows;
                return [2 /*return*/, rows[0]];
        }
    });
}); };
/**
 * Busca un usuario por su ID de forma segura.
 * Esta función es ideal para uso general en la aplicación, ya que excluye
 * explícitamente el `password_hash` y otros datos sensibles del resultado.
 *
 * @param {string} user_id - El ID único del usuario a buscar.
 * @returns {Promise<User | undefined>} Una promesa que se resuelve con el objeto del usuario
 * si se encuentra, o `undefined` si no existe un usuario con ese ID.
 */
var findById = function (user_id) { return __awaiter(void 0, void 0, void 0, function () {
    var query, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = {
                    text: "\n    SELECT user_id,username,email,role,created_at FROM USERS\n    WHERE user_id = $1\n    ",
                    values: [user_id],
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_a.sent()).rows;
                return [2 /*return*/, rows[0]];
        }
    });
}); };
// --- Función del Modelo ---
/**
 * Actualiza los datos de un usuario específico en la base de datos.
 * Es una función genérica; la lógica de permisos (quién puede actualizar qué)
 * debe ser manejada por el controlador que la llama.
 *
 * @param {UpdateUserInput} input - Un objeto con el 'user_id' a actualizar y los campos opcionales a modificar.
 * @returns {Promise<User | undefined>} Una promesa que se resuelve con el objeto del usuario actualizado
 * (sin datos sensibles) o `undefined` si el usuario no fue encontrado.
 */
var updateUser = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var query, rows;
    var email = _b.email, username = _b.username, role = _b.role, user_id = _b.user_id;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                query = {
                    text: "\n    UPDATE USERS\n      SET\n        email = COALESCE($1, email),\n        username = COALESCE($2, username),\n        role = COALESCE($3, role)\n      WHERE user_id = $4\n      RETURNING user_id, username, email, role\n    ",
                    values: [email, username, role, user_id],
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_c.sent()).rows;
                return [2 /*return*/, rows[0]];
        }
    });
}); };
/**
 * Elimina un usuario específico de la base de datos por su ID.
 * ¡ADVERTENCIA! Esta es una operación destructiva y permanente.
 * Gracias a la configuración 'ON DELETE CASCADE' en la base de datos,
 * al eliminar un usuario también se eliminarán en cascada todos sus
 * gastos y categorías asociadas.
 *
 * @param {string} user_id - El ID único del usuario a eliminar.
 * @returns {Promise<User | undefined>} Una promesa que se resuelve con el objeto
 * del usuario eliminado (sin datos sensibles) o `undefined` si no se encontró
 * ningún usuario con ese ID.
 */
var remove = function (user_id) { return __awaiter(void 0, void 0, void 0, function () {
    var query, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = {
                    text: "\n      DELETE FROM USERS \n      WHERE user_id = $1\n      RETURNING user_id, username, email, role\n    ",
                    values: [user_id]
                };
                return [4 /*yield*/, pool.query(query)];
            case 1:
                rows = (_a.sent()).rows;
                return [2 /*return*/, rows[0]];
        }
    });
}); };
export var UserModel = {
    create: create,
    findByEmailForAuth: findByEmailForAuth,
    findById: findById,
    updateUser: updateUser,
    remove: remove
};
