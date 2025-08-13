"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDbConnection = exports.pool = void 0;
const pg_1 = require("pg");
const connectionString = process.env.DATABASE_URL;
exports.pool = new pg_1.Pool({
    allowExitOnIdle: true,
    connectionString,
});
const checkDbConnection = async () => {
    try {
        const client = await exports.pool.connect();
        await client.query("SELECT NOW()");
        console.info("database connected 🚀🚀🚀");
        client.release();
    }
    catch (error) {
        console.error("database connection error ❌❌❌", error);
        process.exit(1);
    }
};
exports.checkDbConnection = checkDbConnection;
