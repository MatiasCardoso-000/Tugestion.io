"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesModel = void 0;
const db_1 = require("../database/db");
const create = async ({ category_id, user_id, amount, description, expense_date, }) => {
    const query = {
        text: `
    INSERT INTO EXPENSES(category_id, user_id, amount, description, expense_date)
      VALUES($1, $2, $3, $4, COALESCE($5,CURRENT_DATE))
      RETURNING *
    `,
        values: [category_id, user_id, amount, description, expense_date],
    };
    const { rows } = await db_1.pool.query(query);
    return rows[0];
};
const find = async () => {
    const query = {
        text: `
    SELECT * FROM EXPENSES
    `,
    };
    const { rows } = await db_1.pool.query(query);
    return rows;
};
const findById = async (expense_id, user_id) => {
    const query = {
        text: `
    SELECT * FROM EXPENSES
   WHERE expense_id = $1 AND user_id = $2
    `,
        values: [expense_id, user_id],
    };
    const { rows } = await db_1.pool.query(query);
    return rows[0];
};
const findByUser = async (user_id) => {
    const query = {
        text: `
    SELECT * FROM EXPENSES
   WHERE user_id = $1 
    `,
        values: [user_id],
    };
    const { rows } = await db_1.pool.query(query);
    return rows;
};
const update = async ({ expense_id, user_id, amount, category_id, description, expense_date, }) => {
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
    const { rows } = await db_1.pool.query(query);
    return rows[0];
};
const remove = async (expense_id, user_id) => {
    const query = {
        text: `
            DELETE FROM EXPENSES
            WHERE expense_id = $1 AND user_id = $2
            RETURNING *
        `,
        values: [expense_id, user_id],
    };
    const { rows } = await db_1.pool.query(query);
    return rows[0];
};
exports.ExpensesModel = {
    create,
    find,
    findById,
    findByUser,
    update,
    remove,
};
