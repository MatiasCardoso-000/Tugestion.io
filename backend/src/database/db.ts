import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:root@localhost:5432/Tugestion.io";

export const pool = new Pool({
  allowExitOnIdle: true,
  connectionString,
});

export const checkDbConnection = async () => {
  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    console.info("database connected 🚀🚀🚀");
    client.release()
  } catch (error) {
    console.error("database connection error ❌❌❌", error);
    process.exit(1);
  }
};
