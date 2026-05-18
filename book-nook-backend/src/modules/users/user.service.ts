import { pool } from "../../config/db";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const createUserIntoDb = async (
  payload: Omit<IUser, "is_active" | "created_at">,
): Promise<Omit<IUser, "password">> => {
  const { name, email, password, age } = payload;

  const hashedPass = await bcrypt.hash(password, 8);

  const res = await pool.query(
    `INSERT INTO users (name, email, password, age) VALUES($1,$2,$3,$4) RETURNING *`,
    [name, email, hashedPass, age],
  );

  const { password: _, ...userWithoutPassword } = res.rows[0];

  return userWithoutPassword;
};

const getUsersFromDb = async (): Promise<IUser[]> => {
  const res = await pool.query(
    `SELECT name, email, age, is_active, created_at FROM users`,
  );

  return res.rows;
};

export const userService = {
  createUserIntoDb,
  getUsersFromDb,
};
