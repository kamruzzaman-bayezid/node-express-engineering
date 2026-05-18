import { pool } from "../../config/db";
import { ERROR_CODES } from "../../types";
import { AppError } from "../../utils/AppError";
import bcrypt from "bcryptjs";
import type { IUser } from "../users/user.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: { email: string; password: string }) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    payload.email,
  ]);

  if (result.rows.length === 0) {
    throw new AppError("Invalid Credentials", 401, ERROR_CODES.UNAUTHORIZED);
  }

  const user: IUser = result.rows[0];

  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatch) {
    throw new AppError("Invalid Credentials", 401, ERROR_CODES.UNAUTHORIZED);
  }

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    is_active: user.is_active,
  };

  const token = jwt.sign(userData, config.jwt_secret, { expiresIn: "1d" });

  const { password: _, ...userWithOutPassword } = user;

  return { token, data: userWithOutPassword };
};

export const authService = { loginUser };
