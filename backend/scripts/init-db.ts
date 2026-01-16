import { Client } from 'pg';

const createDatabase = async () => {
  const client = new Client({
    connectionString: 'postgres://postgres:root@localhost:5432/postgres',
  });

  try {
    await client.connect();
    console.log('Connected to postgres database.');
    
    // Check if database exists
    const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'tugestion'");
    if (res.rowCount === 0) {
        console.log('Creating database "tugestion"...');
        await client.query('CREATE DATABASE tugestion');
        console.log('Database "tugestion" created successfully.');
    } else {
        console.log('Database "tugestion" already exists.');
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
};

createDatabase();
