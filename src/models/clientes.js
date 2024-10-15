import dfd from "danfojs-node";
import PromptSync from "prompt-sync";
import { connection } from "../database/conexion.js";
import { to } from "../utils/errorHandler.js";

export class Cliente {
  cpf;
  nome_cliente;
  idade;

  constructor() {
    this.scan = PromptSync();
  }

  async inputDadosCliente() {
    this.cpf = this.scan("Digite o CPF: ");
    const cliente = await this.buscarClienteCpf(this.cpf);
    if (cliente) {
      console.log("Cliente já registrado.");
      return;
    }
    this.nome_cliente = this.scan("Digite o nome do cliente: ");
    this.idade = +this.scan("Digite a idade: ");
  }

  async inserirDadosCliente() {
    const sql = `INSERT INTO cliente (cpf, nome_cliente, idade) VALUES (?, ?, ?)`;
    const [err] = await to(
      new Promise((resolve, _) => {
        connection.query(sql, [this.cpf, this.nome_cliente, this.idade]);
      })
    );
    console.log("Cliente inserido com sucesso!");
  }

  async buscarCliente() {
    const sql = `SELECT * FROM cliente`;

    const [err, result] = await to(
      new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err) {
            return reject(new Error("Erro ao buscar clientes: " + err.message));
          }
          resolve(result);
        });
      })
    );

    if (err) {
      console.error(err);
      return;
    }

    const df = new dfd.DataFrame(result);
    df.print();

    return df;
  }

  async buscarClienteCpf(cpf) {
    const sql = `SELECT * FROM cliente WHERE cpf = "${cpf}"`;

    const [err, result] = await to(
      new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
          if (err) {
            return reject(new Error("Erro ao buscar clientes: " + err.message));
          }
          resolve(result);
        });
      })
    );

    console.log(result);

    return result;
  }

  async removerCliente() {
    await this.buscarCliente();

    const cpf = this.scan("Deleter pelo CPF: ");
    const sql = `DELETE FROM cliente WHERE cpf = ?`;

    const [err] = await to(
      new Promise((resolve, reject) => {
        connection.query(sql, [cpf], (err) => {
          if (err) return reject("Erro ao deletar o cliente");
          return resolve("Cliente excluído com sucesso!");
        });
      })
    );

    if (err) {
      console.error(err);
      return;
    }

    console.log("Cliente excluído com sucesso!");
  }
}
