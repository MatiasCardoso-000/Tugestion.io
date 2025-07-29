import { pool } from "../database/db";
import {
  CreateExpense,
  Expense,
  UpdateExpenseInput,
} from "../types/expenses.types";

const create = async ({
  category_id,
  user_id,
  amount,
  description,
  expense_date,
}: CreateExpense): Promise<Expense> => {
  const query = {
    text: `
    INSERT INTO EXPENSES(category_id, user_id, amount, description, expense_date)
      VALUES($1, $2, $3, $4, COALESCE($5,CURRENT_DATE))
      RETURNING *
    `,
    values: [category_id, user_id, amount, description, expense_date],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const find = async (): Promise<Expense[]> => {
  const query = {
    text: `
    SELECT * FROM EXPENSES
    `,
  };
  const { rows } = await pool.query(query);
  return rows;
};

const findById = async (
  expense_id: string,
  user_id: string
): Promise<Expense | undefined> => {
  const query = {
    text: `
    SELECT * FROM EXPENSES
   WHERE expense_id = $1 AND user_id = $2
    `,
    values: [expense_id, user_id],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const findByUser = async (user_id: string): Promise<Expense[]> => {
  const query = {
    text: `
    SELECT * FROM EXPENSES
   WHERE user_id = $1 
    `,
    values: [user_id],
  };
  const { rows } = await pool.query(query);
  return rows;
};

const update = async ({
  expense_id,
  user_id,
  amount,
  category_id,
  description,
  expense_date,
}: UpdateExpenseInput): Promise<Expense | undefined> => {
  const query = {
    text: `
    UPDATE EXPENSES
      SET 
        amount = COALESCE($1, amount),
        description = COALESCE($2, description),
        category_id = COALESCE($3, category_id),
        expense_date = COALESCE($4, expense_date)
      WHERE expense_id = $5 AND user_id = $6
      RETURNING *

    `,
    values: [
      amount,
      description,
      category_id,
      expense_date,
      expense_id,
      user_id,
    ],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const remove = async (
  expense_id: string,
  user_id: string
): Promise<Expense | undefined> => {
  const query = {
    text: `
            DELETE FROM EXPENSES
            WHERE expense_id = $1 AND user_id = $2
            RETURNING *
        `,
    values: [expense_id, user_id],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

export const ExpensesModel = {
  create,
  find,
  findById,
  findByUser,
  update,
  remove,
};
