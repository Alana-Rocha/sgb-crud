import dfd from "danfojs-node";
import { connection } from "../database/conexion.js";

export class ClienteModel {
  async inserirDadosCliente(cpf, nome_cliente, idade) {
    try {
      const sql = `INSERT INTO cliente (cpf, nome_cliente, idade) VALUES (?, ?, ?)`;
      await new Promise((resolve, reject) => {
        connection.query(sql, [cpf, nome_cliente, idade], (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
      console.log("Cliente inserido com sucesso.");
    } catch (error) {
      console.error("Erro ao inserir dados do cliente:", error.message);
      throw error;
    }
  }

  async buscarClientes() {
    try {
      const sql = `SELECT * FROM cliente`;
      const result = await new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });

      const df = new dfd.DataFrame(result);
      df.setIndex({ column: "cpf", drop: true, inplace: true });
      df.print();

      return df;
    } catch (error) {
      console.error("Erro ao buscar Cliente", error.message);
      throw error;
    }
  }

  async removerCliente(cpf) {
    try {
      const sql = `DELETE FROM cliente WHERE cpf = ?`;
      await new Promise((resolve, reject) => {
        connection.query(sql, [cpf], (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
      console.log("Cliente removido com sucesso.");
    } catch (error) {
      console.error("Erro ao remover cliente:", error.message);
      throw error;
    }
  }

  async verificaCpf(cpf) {
    try {
      const sql = `SELECT * FROM cliente WHERE cpf = ?`;
      const result = await new Promise((resolve, reject) => {
        connection.query(sql, [cpf], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });

      return result;
    } catch (error) {
      console.error("Erro ao verificar CPF:", error.message);
      throw error;
    }
  }
}
