import PromptSync from "prompt-sync";
import { connectDB, connection } from "../database/conexion.js";
import { rejects } from "assert";

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
    this.idade = +this.scan("Digite a idade: "); // Converte a idade para número
  }

  async escreverDadosDB() {
    const sql = `INSERT INTO cliente (cpf, nome_cliente, idade) VALUES (?, ?, ?)`;
    connection.query(sql, [this.cpf, this.nome_cliente, this.idade], (err) => {
      if (err) return console.log("Erro ao inserir dados do cliente", err);
      return console.log("sucesso");
    });
  }

  async buscarClientesDB() {
    const sql = `SELECT * FROM cliente`;
    await new Promise((resolve, reject) => {
      connection.query(sql, (err, result) => {
        if (err) return reject(console.log("Erro ao buscar CPF", err));
        return resolve(console.log(result));
      });
    });
  }
}
