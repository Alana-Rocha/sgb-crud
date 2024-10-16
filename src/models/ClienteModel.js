import { connection } from "../database/conexion.js";
import { to } from "../utils/errorHandler.js";

export class ClienteModel {
  async inserirDadosCliente(cpf, nome_cliente, idade) {
    const sql = `INSERT INTO cliente (cpf, nome_cliente, idade) VALUES (?, ?, ?)`;
    const [err] = await to(
      new Promise((resolve, reject) => {
        connection.query(sql, [cpf, nome_cliente, idade], (err) => {
          if (err) return reject(err);
          resolve();
        });
      })
    );

    if (err) throw err;
  }

  async buscarClientes() {
    const sql = `SELECT * FROM cliente`;
    const [err, result] = await to(
      new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      })
    );

    if (err) throw err;

    return result;
  }

  async removerCliente(cpf) {
    const sql = `DELETE FROM cliente WHERE cpf = ?`;
    const [err] = await to(
      new Promise((resolve, reject) => {
        connection.query(sql, [cpf], (err) => {
          if (err) return reject(err);
          resolve();
        });
      })
    );

    if (err) throw err;
  }

  async verificaCpf(cpf) {
    const sql = `SELECT * FROM cliente WHERE cpf = ${cpf}`;
    const [err, result] = await to(
      new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      })
    );

    if (err) throw err;

    return result;
  }
}
