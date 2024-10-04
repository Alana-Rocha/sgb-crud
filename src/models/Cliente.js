import PromptSync from "prompt-sync";
import { connection } from "../database/conexion.js";

export class Cliente {
  cpf;
  nome_cliente;
  idade;

  constructor() {
    this.cpf = "";
    this.nome_cliente = "";
    this.idade = 0;
    this.scan = PromptSync();
  }

  inputDados() {
    this.cpf = this.scan("Digite o CPF: ");
    this.nome_cliente = this.scan("Digite o nome do cliente: ");
    this.idade = +this.scan("Digite a idade: ");
  }

  async escreverDadosDB() {
    const sql = `INSERT INTO cliente (cpf, nome_cliente, idade) VALUES (?, ?, ?)`;
    await new Promise((resolve, reject) => {
      connection.query(
        sql,
        [this.cpf, this.nome_cliente, this.idade],
        (err) => {
          if (err) return reject("Erro ao inserir dados do cliente", err);
          return resolve("Cliente inserido");
        }
      );
    });
  }

  async buscarClientesDB() {
    const sql = `SELECT * FROM cliente`;
    await new Promise((resolve, reject) => {
      connection.query(sql, (err, result) => {
        if (err) return reject(console.log("Erro ao buscar", err));
        return resolve(console.table(result));
      });
    });
  }

  async removerClientesDB() {
    await this.buscarClientesDB();
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
