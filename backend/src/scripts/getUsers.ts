import { pool } from "../database/db";

async function getUsers() {
  try {
    const { rows } = await pool.query("SELECT user_id, username, email, role FROM USERS");
    console.log(rows);
  } catch (error) {
    console.error("Error getting users:", error);
  } finally {
    await pool.end();
  }
}

getUsers();
