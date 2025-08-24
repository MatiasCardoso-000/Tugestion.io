import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  allowExitOnIdle: true,
  connectionString,
  ssl:true
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
