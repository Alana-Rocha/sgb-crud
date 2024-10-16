import fs from "node:fs";
import { connection } from "../database/conexion.js";

export async function executeSqlFile() {
  const sql = fs.readFileSync("./src/sql/create-tables.sql", "utf-8");

  await new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        return reject("Erro ao executar o SQL de tabelas" +  err);
      }
      return resolve("SQL executado com sucesso.");
    });
  });
}

export async function executeInsertData() {
  const sql = fs.readFileSync("./src/sql/insert-data.sql", "utf-8");

  await new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        return reject("Erro ao inserir o SQL de dados" + err);
      }
      resolve("SQL inserir executado com sucesso.");
    });
  });
}
