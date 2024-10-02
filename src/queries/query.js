
import { connectDB, connection } from "../database/conexion.js";
import fs from "node:fs";

export async function executeSqlFile() {
  const sql = fs.readFileSync("./src/sql/create-tables.sql", "utf-8");

  await new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        return reject("Erro ao executar o SQL:", err);
      }
      return resolve("SQL executado com sucesso.");
    });
  });
}
