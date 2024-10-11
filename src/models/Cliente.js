import dfd from "danfojs-node";
import PromptSync from "prompt-sync";
import { connection } from "../database/conexion.js";

export class Cliente {
  cpf;
  nome_cliente;
  idade;

  constructor() {
    this.scan = PromptSync();
  }

  inputDados() {
    this.cpf = this.scan("Digite o CPF: ");
    this.nome_cliente = this.scan("Digite o nome do cliente: ");
    this.idade = +this.scan("Digite a idade: ");
  }

  async inserirDadosCliente() {
    const sql = `INSERT INTO cliente (cpf, nome_cliente, idade) VALUES (?, ?, ?)`;
    await new Promise((resolve, reject) => {
      connection.query(
        sql,
        [this.cpf, this.nome_cliente, this.idade],
        (err) => {
          if (err) return reject("Cliente já registrado", err);
          return resolve("Cliente inserido");
        }
      );
    });
  }

  async buscarCliente() {
    const sql = `SELECT * FROM cliente`;

    try {
      const result = await new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err) {
            return reject(new Error("Erro ao buscar clientes: " + err.message));
          }
          resolve(result);
        });
      });

      const df = new dfd.DataFrame(result);

      df.print();

      return df;
    } catch (error) {
      console.error(error);
    }
  }

  async removerCliente() {
    await this.buscarCliente();
    const cpf = this.scan("Deleter pelo CPF: ");
    const sql = `DELETE FROM cliente WHERE cpf = ?`;
    await new Promise((resolve, reject) => {
      connection.query(sql, [cpf], (err, result) => {
        if (err) return reject(console.log("Erro ao deleter", err));

        return resolve("cliente excluido");
      });
    });
  }
}
