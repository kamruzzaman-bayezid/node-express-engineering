import path from "path";
import fs from "fs/promises";

export const filePath = path.join(process.cwd(), "./src/db/data.json");

export const readData = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};
