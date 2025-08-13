// __tests__/models/user.model.test.ts
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
// Importamos la función que queremos probar
import { UserModel } from '../../src/models/user.model';
// Importamos el pool de la base de datos para poder simularlo
import { pool } from '../../src/database/db';
// --- SIMULACIÓN (MOCK) DEL MÓDULO DE LA BASE DE DATOS ---
// Le decimos a Jest que todas las llamadas a '../database/db' deben usar
// una versión simulada, no la real.
jest.mock('../../src/database/db', function () { return ({
    // Simulamos el pool de conexión
    pool: {
        // Simulamos la función 'query' del pool
        query: jest.fn(),
    },
}); });
// --- SUITE DE PRUEBAS PARA EL MODELO DE USUARIO ---
describe('UserModel', function () {
    // Limpiamos todas las simulaciones después de cada prueba para que no interfieran entre sí
    afterEach(function () {
        jest.clearAllMocks();
    });
    // --- PRUEBAS PARA LA FUNCIÓN 'create' ---
    describe('create', function () {
        // Test 1: El "Happy Path" - ¿Qué pasa cuando todo funciona bien?
        it('debe crear un usuario y devolver sus datos de forma segura', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, mockUser, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = {
                            username: 'testuser',
                            email: 'test@example.com',
                            password_hash: 'hashed_password_string',
                        };
                        mockUser = {
                            user_id: '1',
                            username: 'testuser',
                            email: 'test@example.com',
                            role: 'user', // El rol por defecto que asigna la DB
                        };
                        // Configuramos nuestra simulación: cuando se llame a pool.query,
                        // debe devolver el 'mockUser' que acabamos de definir.
                        pool.query.mockResolvedValue({
                            rows: [mockUser],
                        });
                        return [4 /*yield*/, UserModel.create(input)];
                    case 1:
                        result = _a.sent();
                        // 3. ASERCIÓN (Assert)
                        // Comprobamos que el resultado sea el que esperamos
                        expect(result).toEqual(mockUser);
                        // Verificamos que se llamó a la base de datos con la consulta SQL correcta
                        expect(pool.query).toHaveBeenCalledTimes(1);
                        expect(pool.query).toHaveBeenCalledWith(expect.objectContaining({
                            text: expect.stringContaining('INSERT INTO USERS'),
                            values: [input.username, input.email, input.password_hash],
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        // Test 2: El "Sad Path" - ¿Qué pasa si la base de datos da un error?
        it('debe lanzar un error si el email ya existe', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, dbError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = {
                            username: 'anotheruser',
                            email: 'duplicate@example.com',
                            password_hash: 'another_hash',
                        };
                        dbError = {
                            code: '23505', // Código de error de PostgreSQL para 'unique_violation'
                            message: 'El email ya existe',
                        };
                        // Configuramos la simulación para que rechace la promesa con nuestro error
                        pool.query.mockRejectedValue(dbError);
                        // 2. ACTUACIÓN Y ASERCIÓN (Act & Assert)
                        // Esperamos que la llamada a UserModel.create FALLE.
                        // Usamos 'expect.assertions(1)' para asegurar que la prueba de 'rejects' se ejecute.
                        expect.assertions(1);
                        return [4 /*yield*/, expect(UserModel.create(input)).rejects.toEqual(dbError)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
