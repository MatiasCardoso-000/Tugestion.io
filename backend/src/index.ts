import express, { Request, Response } from "express";
import { checkDbConnection } from "./database/db";
import { router as AdminRouter } from "./routes/admin.routes";
import { router as AuthRouter } from "./routes/user.routes";
import { router as TransactionsRouter } from "./routes/transactions.routes";
import { router as CategoriesRouter } from "./routes/category.routes";
import {router as BudgetRouter} from './routes/budget.routes'
import cookieParser from "cookie-parser";
import cors from 'cors';
import { PORT } from "./config/config";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use(cors( {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));


app.use("/api/admin", AdminRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/transactions", TransactionsRouter);
app.use("/api/categories", CategoriesRouter);
app.use("/api/budgets", BudgetRouter);


app.get("/ping", (req: Request, res: Response) => {
  res.send('Backend funcionando 🚀🚀🚀');
});


const startServer = async () => {
  await checkDbConnection();

  app.listen(PORT, () => {
    console.info(`🚀 Server is running on port ${PORT}`);
  });
};

startServer();
