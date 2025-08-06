import { pool } from "../database/db";

const addBudget = async (user_id: string, amount: number, period: string) => {
  const query = {
    text: `
    INSERT INTO BUDGETS(user_id,amount,period)
    VALUES($1,$2,$3)
    RETURNING *
    `,
    values: [user_id, amount, period],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const getBudgetByUserId = async (user_id: string) => {
  const query = {
    text: `
  SELECT * FROM BUDGETS WHERE user_id = $1
  `,
    values: [user_id],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const updateBudget = async (
  budget_id: string,
  amount: number,
  period: string
) => {
  const query = {
    text: `
    UPDATE BUDGETS
    SET amount = $1, period = $2
    WHERE budget_id = $3
    RETURNING *
    `,
    values: [amount, period, budget_id],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const deleteBudget = async (user_id: string) => {
  const query = {
    text: `
    DELETE FROM BUDGET
    WHERE user_id = $1
    RETURNING *
    `,
    values: [user_id],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

export const BudgetModel = {
  addBudget,
  getBudgetByUserId,
  updateBudget,
  deleteBudget,
};
