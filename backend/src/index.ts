import express, { Request, Response } from "express";
import { PORT } from "./config/config";
import { checkDbConnection, pool } from "./database/db";
import { router as AdminRouter } from "./routes/admin.routes";
import { router as AuthRouter } from "./routes/user.routes";
import { router as ExpensesRouter } from "./routes/expenses.routes";
import { router as CategoriesRouter } from "./routes/category.routes";
import {router as BudgetRouter} from './routes/budget.routes'
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


const corsOptions = {
  origin: process.env.FRONTEND_URL,
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


app.get("/ping", (req: Request, res: Response) => {
  res.send(pool.query("SELECT NOW()"));
});


const startServer = async () => {
  await checkDbConnection();

  app.listen(PORT, () => {
    console.info(`🚀 Server is running on port ${PORT}`);
  });
};

startServer();
