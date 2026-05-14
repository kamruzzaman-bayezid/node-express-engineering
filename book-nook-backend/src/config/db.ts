import { Pool } from "pg";
import config from ".";

export const pool = new Pool({ connectionString: config.connection_string });

export const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(100) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      stock_quantity INT DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `);

  console.log("Database connected successfully!");
};
