import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const conexion = mysql.createConnection({
  host: "localhost",
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
