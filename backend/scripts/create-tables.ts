import { Client } from 'pg';

const createTables = async () => {
  const client = new Client({
    connectionString: 'postgres://postgres:root@localhost:5432/tugestion',
  });

  try {
    await client.connect();
    console.log('Connected to database "tugestion".');

    // 1. Create users table matches
    console.log('Creating "users" table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "user_id" SERIAL PRIMARY KEY,
        "username" character varying NOT NULL UNIQUE,
        "created_at" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "email" character varying NOT NULL UNIQUE,
        "role" character varying NOT NULL,
        "password_hash" character varying NOT NULL
      );
    `);

    // 2. Create revoked_tokens table
    console.log('Creating "revoked_tokens" table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS "revoked_tokens" (
        "token" text PRIMARY KEY,
        "revoked_at" timestamp with time zone NOT NULL
      );
    `);

    // 3. Create category table (depends on users)
    console.log('Creating "category" table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS "category" (
        "category_id" SERIAL PRIMARY KEY,
        "category_name" character varying NOT NULL,
        "user_id" integer NOT NULL,
        CONSTRAINT fk_user_id FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE
      );
    `);

    // 4. Create budgets table (depends on category and users)
    console.log('Creating "budgets" table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS "budgets" (
        "budget_id" SERIAL PRIMARY KEY,
        "updated_at" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "year" integer NOT NULL,
        "amount" numeric NOT NULL,
        "category_id" integer NOT NULL,
        "created_at" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "user_id" integer NOT NULL,
        "month" integer NOT NULL,
        CONSTRAINT fk_category_id FOREIGN KEY ("category_id") REFERENCES "category" ("category_id") ON DELETE CASCADE,
        CONSTRAINT fk_user_id FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE
      );
    `);

    // 5. Create transactions table (depends on users and category)
    console.log('Creating "transactions" table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS "transactions" (
        "transaction_id" SERIAL PRIMARY KEY,
        "user_id" integer NOT NULL,
        "description" text NOT NULL,
        "date" date NOT NULL,
        "transaction_type" character varying NOT NULL,
        "created_at" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "category_id" integer NOT NULL,
        "amount" numeric NOT NULL,
        CONSTRAINT fk_user_id FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE,
        CONSTRAINT fk_category_id FOREIGN KEY ("category_id") REFERENCES "category" ("category_id") ON DELETE CASCADE
      );
    `);

    console.log('All tables created successfully.');

  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    await client.end();
  }
};

createTables();
