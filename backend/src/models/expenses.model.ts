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
  date,
  transaction_type
}: CreateExpense): Promise<Expense> => {
  const query = {
    text: `
    INSERT INTO EXPENSES(amount, date, description, transaction_type, category_id, user_id)
      VALUES($1, COALESCE($2, CURRENT_DATE), $3, $4, $5,$6)
      RETURNING *
    `,
    values: [amount, date, description, transaction_type, category_id, user_id],
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
  id: string,
  user_id: string
): Promise<Expense | undefined> => {
  const query = {
    text: `
    SELECT * FROM EXPENSES
   WHERE id = $1 AND user_id = $2
    `,
    values: [id, user_id],
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
 id,
  user_id,
  amount,
  category_id,
  description,
  date,
}: UpdateExpenseInput): Promise<Expense | undefined> => {
  const query = {
    text: `
    UPDATE EXPENSES
      SET 
        amount = COALESCE($1, amount),
        description = COALESCE($2, description),
        category_id = COALESCE($3, category_id),
       date = COALESCE($4, date)
      WHERE id = $5 AND user_id = $6
      RETURNING *

    `,
    values: [
      amount,
      description,
      category_id,
     date,
      id,
      user_id,
    ],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const remove = async (
  id: string,
  user_id: string
): Promise<Expense | undefined> => {
  const query = {
    text: `
            DELETE FROM EXPENSES
            WHERE id = $1 AND user_id = $2
            RETURNING *
        `,
    values: [id, user_id],
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
