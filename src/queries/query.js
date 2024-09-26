import { conexion } from "../database/conexion.js";
import fs from "node:fs";

export class Query {
  lerArquivoSQL(arquivo) {
    return fs.readFileSync(arquivo, "utf-8");
  }

  async criarTabelas() {
    const arquivo = "./src/sql/create-tables.sql";
    const sql = this.lerArquivoSQL(arquivo);

    conexion.query(sql, (err) => {
      if (err) throw err;
      console.log("Tabela criada com sucesso!");
    });
  }
}
