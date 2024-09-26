import { conexion } from "../database/conexion.js";
import fs from "node:fs";

export class Query {
  lerArquivoSQL(arquivo) {
    return fs.readFileSync(arquivo, "utf-8");
  }

  async criarTabelas() {
    const arquivo = "./src/sql/create-tables.sql";
    const sql = this.lerArquivoSQL(arquivo);

    try {
      await new Promise((resolve, reject) => {
        conexion.query(sql, (err) => {
          if (err) return reject(err);
          resolve("tabela criada com sucesso");
        });
      });
      return true;
    } catch {
      return false;
    }
  }

  async inserirDadosTabela(nome, email, senha) {
    const arquivo = "./src/sql/insert-dados.sql";
    const sql = this.lerArquivoSQL(arquivo);

    try {
      await new Promise((resolve, reject) => {
        conexion.query(sql, [nome, email, senha], (err) => {
          if (err) return reject(err);
          resolve("Dados inseridos");
        });
      });
      return true;
    } catch (err) {
      return err;
    }
  }
}
