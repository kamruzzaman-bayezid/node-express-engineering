import express, { type Request, type Response } from "express";
import { Pool } from "pg";
import config from "./config";

const app = express();
const port = config.port || 5000;

app.use(express.json());

const pool = new Pool({
  connectionString: config.connecting_string,
});

const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20),
            email VARCHAR(20) UNIQUE NOT NULL,
            password VARCHAR(20) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            age INT,

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
      )
      `);

    console.log("Database Connected Successfully!!");
  } catch (error) {
    console.log(error);
  }
};

initDb();

app.get("/api/v1", (req: Request, res: Response) => {
  res.status(200).send("Express Core Architecture!!");
});

// create user
app.post("/api/v1/users", async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4) RETURNING *`,
      [name, email, password, age],
    );

    return res.status(201).send({
      success: true,
      message: "Data created successfully!",
      data: result?.rows[0],
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error?.message : "Something is wrong";
    res.status(500).send({
      success: false,
      message: errorMessage,
      details: error,
    });
  }
});

// get all user
app.get("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    return res.status(200).send({
      success: true,
      message: "User retrieved successfully!!",
      data: result?.rows,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error?.message : "Something is wrong";
    return res.status(500).send({
      success: false,
      message: errorMessage,
      details: error,
    });
  }
});

// get single user
app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);

    if (result?.rows?.length === 0) {
      return res.status(404).send({
        success: false,
        message: "User Not Found!!",
        data: {},
      });
    }

    return res.status(200).send({
      success: true,
      message: "User retrieved successfully!!",
      data: result?.rows[0],
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error?.message : "Something is wrong";
    res.status(500).send({
      success: false,
      message: errorMessage,
      details: error,
    });
  }
});

// update user
app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, password, age, is_active } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users 
            SET 
            name=COALESCE($1,name),
            password=COALESCE($2,password),
            age=COALESCE($3,age),
            is_active=COALESCE($4,is_active)
            WHERE id=$5 RETURNING *`,
      [name, password, age, is_active, id],
    );

    if (result?.rows?.length === 0) {
      return res.status(404).send({
        success: false,
        message: "User Not Found!!",
        data: {},
      });
    }

    return res.status(200).send({
      success: true,
      message: "User updated successfully!!",
      data: result?.rows[0],
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error?.message : "Something is wrong";
    res.status(500).send({
      success: false,
      message: errorMessage,
      details: error,
    });
  }
});

// delete user
app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await pool.query(
      `DELETE FROM users WHERE id=$1 RETURNING id,name`,
      [id],
    );

    if (result?.rows?.length === 0) {
      return res.status(404).send({
        success: false,
        message: "User Not Found!!",
        data: {},
      });
    }

    return res.status(200).send({
      success: true,
      message: "User deleted successfully!!",
      data: result?.rows[0],
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error?.message : "Something is wrong";
    return res.status(500).send({
      success: false,
      message: errorMessage,
      details: error,
    });
  }
});

app.listen(port, () => {
  console.log(`ECA app is running in port ${port}!!`);
});
