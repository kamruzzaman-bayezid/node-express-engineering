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

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL CHECK (LENGTH(password) >= 6),
      is_active BOOLEAN DEFAULT true,
      age INT,

      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
    `);

  console.log("Database connected successfully!");
};
