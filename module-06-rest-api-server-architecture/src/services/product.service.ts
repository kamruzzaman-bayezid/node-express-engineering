import path from "path";
import fs from "fs";
import type { IProduct } from "../types/product.type";

const filePath = path.join(process.cwd(), "./src/database/products.json");

export const readProduct = () => {
  const products = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(products);
};

export const createProduct = (payload: IProduct) => {
  fs.writeFileSync(filePath, JSON.stringify(payload));
};
