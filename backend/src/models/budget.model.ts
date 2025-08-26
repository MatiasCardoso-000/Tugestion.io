import { pool } from "../database/db";

const createBudget = async (
  user_id: string,
  category_id: string,
  amount: string,
  month: string,
  year: string
) => {
  const query = {
    text: `
    INSERT INTO BUDGETS(user_id, category_id,amount,month,year)
    VALUES(
    $1,
    $2,
    $3,
    COALESCE($4, EXTRACT(MONTH FROM NOW())),
    COALESCE($5, EXTRACT(YEAR FROM NOW()))
  )
    RETURNING *
    `,
    values: [user_id, category_id, amount, month, year],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const getAll = async () => {
  const query = {
    text: `
      SELECT * FROM BUDGETS
    ORDER BY month 

    `,
  };
  const { rows } = await pool.query(query);
  return rows;
};

const findByUserAndMonth = async (
  user_id: string,
  month: string,
  year: string
) => {
  const query = {
    text: `
  SELECT * FROM BUDGETS WHERE user_id = $1 AND month = $2 AND year = $3
  `,
    values: [user_id, month, year],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const findById = async (budget_id: string) => {
  const query = {
    text: `
  SELECT * FROM BUDGETS WHERE budget_id = $1
  `,
    values: [budget_id],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const updateBudget = async (
  amount: number,
  month: string,
  year: string,
  budget_id: string
) => {
  const query = {
    text: `
    UPDATE BUDGETS
    SET amount = $1, month = $2 , year = $3
    WHERE budget_id = $4
    RETURNING *
    `,
    values: [amount, month, year, budget_id],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const deleteBudget = async (budget_id: string) => {
  const query = {
    text: `
    DELETE FROM BUDGETS
    WHERE budget_id = $1
    RETURNING *
    `,
    values: [budget_id],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

export const BudgetModel = {
  createBudget,
  getAll,
  findByUserAndMonth,
  findById,
  updateBudget,
  deleteBudget,
};
