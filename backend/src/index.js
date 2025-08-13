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
import express from "express";
import { PORT } from "./config/config";
import { checkDbConnection } from "./database/db";
import { router as AdminRouter } from "./routes/admin.routes";
import { router as AuthRouter } from "./routes/user.routes";
import { router as ExpensesRouter } from "./routes/expenses.routes";
import { router as CategoriesRouter } from "./routes/category.routes";
import { router as BudgetRouter } from './routes/budget.routes';
import cookieParser from "cookie-parser";
import cors from 'cors';
var app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
var corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   // Define el origen permitido.
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   // Define los métodos HTTP permitidos.
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   // Define los encabezados permitidos en las solicitudes.
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   // Permite que el navegador envíe credenciales (cookies).
//   res.setHeader("Access-Control-Allow-Credentials", 'true');
//   // --- ¡LA PARTE NUEVA Y CRUCIAL! ---
//   // Si la petición es de tipo OPTIONS (pre-flight), respondemos con 200 OK.
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }
//   // Para todas las demás peticiones, pasamos a la siguiente función.
//   next();
// });
app.use("/api/admin", AdminRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/expenses", ExpensesRouter);
app.use("/api/categories", CategoriesRouter);
app.use("/api/budgets", BudgetRouter);
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, checkDbConnection()];
            case 1:
                _a.sent();
                app.listen(PORT, function () {
                    console.info("\uD83D\uDE80 Server is running on port ".concat(PORT));
                });
                return [2 /*return*/];
        }
    });
}); };
startServer();
