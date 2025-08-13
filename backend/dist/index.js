"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const db_1 = require("./database/db");
const admin_routes_1 = require("./routes/admin.routes");
const user_routes_1 = require("./routes/user.routes");
const expenses_routes_1 = require("./routes/expenses.routes");
const category_routes_1 = require("./routes/category.routes");
const budget_routes_1 = require("./routes/budget.routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
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
app.use("/api/admin", admin_routes_1.router);
app.use("/api/auth", user_routes_1.router);
app.use("/api/expenses", expenses_routes_1.router);
app.use("/api/categories", category_routes_1.router);
app.use("/api/budgets", budget_routes_1.router);
const startServer = async () => {
    await (0, db_1.checkDbConnection)();
    app.listen(config_1.PORT, () => {
        console.info(`🚀 Server is running on port ${config_1.PORT}`);
    });
};
startServer();
