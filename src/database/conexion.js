import dotenv from "dotenv";
import mysql from "mysql2";
import { to } from "../utils/errorHandler.js";

dotenv.config();

export const connection = mysql.createConnection({
  host: "localhost",
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
  
});

export async function connectDB() {
  const [err, result] = await to(
    new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          return reject(
            new Error("Erro ao conectar ao banco de dados: " + err.message)
          );
        }
        console.log("CONECTADO");
        resolve("Conectado");
      });
    })
  );

  if (err) {
    console.error(err.message);
    return;
  }

  return result;
}
